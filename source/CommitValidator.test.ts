import core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { Moctokit } from "@kie/mock-github";
import { beforeEach, it } from "mocha";
import { CommitValidator } from "./CommitValidator.js";

beforeEach(() => {
  process.env.GITHUB_REPOSITORY = "kitten-science/test";
  process.env["INPUT_ACCEPT-BREAKING-CHANGES"] = "false";
  process.env["INPUT_ACCEPT-EMOJI"] = "false";
  process.env["INPUT_REQUIRE-CONVENTIONAL"] = "false";
  process.env["INPUT_REQUIRE-SCOPE"] = "false";
});

it("runs", async () => {
  const moctokit = new Moctokit();

  moctokit.rest.pulls.listCommits().reply({
    status: 200,
    data: [
      {
        sha: "invalid-sha",
        commit: {
          message: "lul",
        },
      },
    ],
  });

  const commitValidator = new CommitValidator({
    context,
    core,
    octokit: getOctokit("invalid-token", { request: { fetch } }),
    pr: 123,
  });

  await commitValidator.main();
});
