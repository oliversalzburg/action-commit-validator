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

    for (const commitInfo of commits) {
      core.info(`Analyzing commit ${commitInfo.sha} with message: '${commitInfo.commit.message}'`);

      const messageParts = parseCommitMessage.exec(commitInfo.commit.message);
      let type, scope, breaking, message;
      if (messageParts?.groups === undefined) {
        core.warning(`  Unable to parse commit message: '${commitInfo.commit.message}'`);

        message = commitInfo.commit.message;
      } else {
        type = messageParts.groups.type;
        scope = messageParts.groups.scope;
        breaking = messageParts.groups.breaking;
        message = messageParts.groups.message;
      }

      core.debug(JSON.stringify({ type, scope, breaking, message }));

      if (requireConventional && !type) {
        core.setFailed("  Missing type.");
        continue;
      }

      if (type && !acceptedTypes.includes(type)) {
        core.setFailed(`  Type '${type}' is not acceptable. Accepted: ${acceptedTypes.join(", ")}`);
        continue;
      }

      if (requireScope && !scope) {
        core.setFailed("  Missing scope.");
        continue;
      }

      if (!acceptBreakingChanges && breaking) {
        core.setFailed("  Breaking changes are not accepted.");
        continue;
      }

      if (scope && !anyScopeAccepted && !acceptedScopes.includes(scope)) {
        core.setFailed(
          `  Scope '${scope}' is not acceptable. Accepted: ${acceptedScopes.join(", ")}`,
        );
        continue;
      }

      if (!emojiAllowed && hasEmoji.test(message)) {
        core.setFailed("  Emoji are not accepted.");
        continue;
      }
    }
  }
}
