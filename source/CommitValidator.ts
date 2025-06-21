import type core from "@actions/core";
import { Context } from "@actions/github/lib/context.js";
import { type GitHub } from "@actions/github/lib/utils.js";
import { FromSchema } from "json-schema-to-ts";
import { type CommitsSchema } from "./CommitsSchema.js";

type CommitsResponse = FromSchema<typeof CommitsSchema>;

/**
 * The options for the action.
 */
export interface CommitValidatorOptions {
  /**
   * The Context we're executing in.
   */
  context: Context;

  /**
   * A GitHub Actions Code instance.
   */
  core: typeof core;

  /**
   * An OctoKit instance to use to communicate with GitHub.
   */
  octokit: InstanceType<typeof GitHub>;

  /**
   * The number of the PR that triggered the action.
   */
  pr: number;
}

/**
 * Main implementation of the action.
 */
export class CommitValidator {
  #options: CommitValidatorOptions;

  /**
   * Constructs a new CommitValidator instance.
   * @param options - The options for the action.
   */
  constructor(options: CommitValidatorOptions) {
    this.#options = options;
  }

  /**
   * Execute the action.
   */
  async main() {
    const { context, core, octokit } = this.#options;

    const unsafeResponse = await octokit.rest.pulls.listCommits({
      owner: context.repo.owner,
      pull_number: this.#options.pr,
      repo: context.repo.repo,
    });
    const commits = unsafeResponse.data as CommitsResponse;

    const acceptBreakingChanges = core.getBooleanInput("accept-breaking-changes", {
      required: false,
    });
    const acceptedScopes = core
      .getMultilineInput("accepted-scopes", { required: false })
      .filter(line => line !== "");
    const anyScopeAccepted = acceptedScopes.length === 0;
    const acceptedTypes = core
      .getMultilineInput("accepted-types", { required: false })
      .filter(line => line !== "");
    const emojiAllowed = core.getBooleanInput("accept-emoji", { required: false });
    const requireConventional = core.getBooleanInput("require-conventional", { required: false });
    const requireScope = core.getBooleanInput("require-scope", { required: false });

    const parseCommitMessage =
      /^(?<type>[a-z]+)(?:\((?<scope>[\w-]+)\))?(?<breaking>!)?: (?<message>[^\n]+)$/m;
    const hasEmoji = /\p{Extended_Pictographic}/u;

    let failed = false;
    for (const commitInfo of commits) {
      core.info(`Analyzing commit ${commitInfo.sha} with message: '${commitInfo.commit.message}'`);

      const messageParts = parseCommitMessage.exec(commitInfo.commit.message);
      let type, scope, breaking, message;
      if (messageParts?.groups === undefined) {
        process.stderr.write(`  Unable to parse commit message: '${commitInfo.commit.message}'\n`);

        message = commitInfo.commit.message;
      } else {
        type = messageParts.groups.type;
        scope = messageParts.groups.scope;
        breaking = messageParts.groups.breaking;
        message = messageParts.groups.message;
      }

      core.debug(JSON.stringify({ breaking, message, scope, type }));

      if (requireConventional && !type) {
        process.stderr.write("  Missing type.\n");
        failed = true;
        continue;
      }

      if (type && !acceptedTypes.includes(type)) {
        process.stderr.write(
          `  Type '${type}' is not acceptable. Accepted: ${acceptedTypes.join(", ")}\n`,
        );
        failed = true;
        continue;
      }

      if (requireScope && !scope) {
        process.stderr.write("  Missing scope.\n");
        failed = true;
        continue;
      }

      if (!acceptBreakingChanges && breaking) {
        process.stderr.write("  Breaking changes are not accepted.\n");
        failed = true;
        continue;
      }

      if (scope && !anyScopeAccepted && !acceptedScopes.includes(scope)) {
        process.stderr.write(
          `  Scope '${scope}' is not acceptable. Accepted: ${acceptedScopes.join(", ")}\n`,
        );
        failed = true;
        continue;
      }

      if (!emojiAllowed && hasEmoji.test(message)) {
        process.stderr.write("  Emoji are not accepted.\n");
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
