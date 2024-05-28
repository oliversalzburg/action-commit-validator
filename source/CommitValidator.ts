import core from "@actions/core";
import { Context } from "@actions/github/lib/context.js";
import { type GitHub } from "@actions/github/lib/utils.js";
import { FromSchema } from "json-schema-to-ts";
import { CommitsSchema } from "./CommitsSchema.js";

type CommitsResponse = FromSchema<typeof CommitsSchema>;

export interface CommitValidatorOptions {
  context: Context;
  core: typeof core;
  octokit: InstanceType<typeof GitHub>;
  pr: number;
}

export class CommitValidator {
  #options: CommitValidatorOptions;

  constructor(options: CommitValidatorOptions) {
    this.#options = options;
  }

  async main() {
    const { context, core, octokit } = this.#options;

    const unsafeResponse = await octokit.rest.pulls.listCommits({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: this.#options.pr,
    });
    const commits = unsafeResponse.data as CommitsResponse;

    const acceptBreakingChanges = core.getBooleanInput("accept_breaking_changes", {
      required: false,
    });
    const acceptedScopes = core
      .getMultilineInput("accepted_scopes", { required: false })
      .filter(line => line !== "");
    const anyScopeAccepted = acceptedScopes.length === 0;
    const acceptedTypes = core
      .getMultilineInput("accepted_types", { required: false })
      .filter(line => line !== "");
    const emojiAllowed = core.getBooleanInput("accept_emoji", { required: false });
    const requireConventional = core.getBooleanInput("require_conventional", { required: false });
    const requireScope = core.getBooleanInput("require_scope", { required: false });

    const parseCommitMessage =
      /^(?<type>[a-z]+)(?:\((?<scope>[\w-]+)\))?(?<breaking>!)?: (?<message>[^\n]+)$/m;
    const hasEmoji = /\p{Extended_Pictographic}/u;

    let failed = false;
    for (const commitInfo of commits) {
      core.info(`Analyzing commit ${commitInfo.sha} with message: '${commitInfo.commit.message}'`);

      const messageParts = parseCommitMessage.exec(commitInfo.commit.message);
      let type, scope, breaking, message;
      if (messageParts?.groups === undefined) {
        console.warn(`  Unable to parse commit message: '${commitInfo.commit.message}'`);

        message = commitInfo.commit.message;
      } else {
        type = messageParts.groups.type;
        scope = messageParts.groups.scope;
        breaking = messageParts.groups.breaking;
        message = messageParts.groups.message;
      }

      core.debug(JSON.stringify({ type, scope, breaking, message }));

      if (requireConventional && !type) {
        console.error("  Missing type.");
        failed = true;
        continue;
      }

      if (type && !acceptedTypes.includes(type)) {
        console.error(`  Type '${type}' is not acceptable. Accepted: ${acceptedTypes.join(", ")}`);
        failed = true;
        continue;
      }

      if (requireScope && !scope) {
        console.error("  Missing scope.");
        failed = true;
        continue;
      }

      if (!acceptBreakingChanges && breaking) {
        console.error("  Breaking changes are not accepted.");
        failed = true;
        continue;
      }

      if (scope && !anyScopeAccepted && !acceptedScopes.includes(scope)) {
        console.error(
          `  Scope '${scope}' is not acceptable. Accepted: ${acceptedScopes.join(", ")}`,
        );
        failed = true;
        continue;
      }

      if (!emojiAllowed && hasEmoji.test(message)) {
        console.error("  Emoji are not accepted.");
        failed = true;
        continue;
      }
    }

    if (failed) {
      core.setFailed(`Some commits did not pass validation.
      
      Please note that this repository is using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to track development. All commits in your pull request need to:
      
      1. Have a _type_ that conforms to: ${acceptedTypes.join(",")}
      1. Have a _scope_ that conforms to: ${acceptedScopes.join(",")}
      1. Breaking changes, indicated by a \`!\` in the commit message, are ${acceptBreakingChanges ? "" : "NOT "}allowed.
      1. Emoji are ${emojiAllowed ? "" : "NOT "}allowed.`);
    }
  }
}
