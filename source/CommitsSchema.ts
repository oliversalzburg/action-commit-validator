export const CommitsSchema = {
  items: {
    description: "Commit",
    properties: {
      author: {
        anyOf: [
          {
            type: "null",
          },
          {
            description: "A GitHub user.",
            properties: {
              avatar_url: {
                examples: ["https://github.com/images/error/octocat_happy.gif"],
                format: "uri",
                type: "string",
              },
              email: {
                type: ["string", "null"],
              },
              events_url: {
                examples: ["https://api.github.com/users/octocat/events{/privacy}"],
                type: "string",
              },
              followers_url: {
                examples: ["https://api.github.com/users/octocat/followers"],
                format: "uri",
                type: "string",
              },
              following_url: {
                examples: ["https://api.github.com/users/octocat/following{/other_user}"],
                type: "string",
              },
              gists_url: {
                examples: ["https://api.github.com/users/octocat/gists{/gist_id}"],
                type: "string",
              },
              gravatar_id: {
                examples: ["41d064eb2195891e12d0413f63227ea7"],
                type: ["string", "null"],
              },
              html_url: {
                examples: ["https://github.com/octocat"],
                format: "uri",
                type: "string",
              },
              id: {
                examples: [1],
                type: "integer",
              },
              login: {
                examples: ["octocat"],
                type: "string",
              },
              name: {
                type: ["string", "null"],
              },
              node_id: {
                examples: ["MDQ6VXNlcjE="],
                type: "string",
              },
              organizations_url: {
                examples: ["https://api.github.com/users/octocat/orgs"],
                format: "uri",
                type: "string",
              },
              received_events_url: {
                examples: ["https://api.github.com/users/octocat/received_events"],
                format: "uri",
                type: "string",
              },
              repos_url: {
                examples: ["https://api.github.com/users/octocat/repos"],
                format: "uri",
                type: "string",
              },
              site_admin: {
                type: "boolean",
              },
              starred_at: {
                examples: ['"2020-07-09T00:17:55Z"'],
                type: "string",
              },
              starred_url: {
                examples: ["https://api.github.com/users/octocat/starred{/owner}{/repo}"],
                type: "string",
              },
              subscriptions_url: {
                examples: ["https://api.github.com/users/octocat/subscriptions"],
                format: "uri",
                type: "string",
              },
              type: {
                examples: ["User"],
                type: "string",
              },
              url: {
                examples: ["https://api.github.com/users/octocat"],
                format: "uri",
                type: "string",
              },
            },
            required: [
              "avatar_url",
              "events_url",
              "followers_url",
              "following_url",
              "gists_url",
              "gravatar_id",
              "html_url",
              "id",
              "node_id",
              "login",
              "organizations_url",
              "received_events_url",
              "repos_url",
              "site_admin",
              "starred_url",
              "subscriptions_url",
              "type",
              "url",
            ],
            title: "Simple User",
            type: "object",
          },
        ],
      },
      comments_url: {
        examples: [
          "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
        ],
        format: "uri",
        type: "string",
      },
      commit: {
        properties: {
          author: {
            anyOf: [
              {
                type: "null",
              },
              {
                description: "Metaproperties for Git author/committer information.",
                properties: {
                  date: {
                    examples: ['"2007-10-29T02:42:39.000-07:00"'],
                    type: "string",
                  },
                  email: {
                    examples: ['"chris@ozmm.org"'],
                    type: "string",
                  },
                  name: {
                    examples: ['"Chris Wanstrath"'],
                    type: "string",
                  },
                },
                title: "Git User",
                type: "object",
              },
            ],
          },
          comment_count: {
            examples: [0],
            type: "integer",
          },
          committer: {
            anyOf: [
              {
                type: "null",
              },
              {
                description: "Metaproperties for Git author/committer information.",
                properties: {
                  date: {
                    examples: ['"2007-10-29T02:42:39.000-07:00"'],
                    type: "string",
                  },
                  email: {
                    examples: ['"chris@ozmm.org"'],
                    type: "string",
                  },
                  name: {
                    examples: ['"Chris Wanstrath"'],
                    type: "string",
                  },
                },
                title: "Git User",
                type: "object",
              },
            ],
          },
          message: {
            examples: ["Fix all the bugs"],
            type: "string",
          },
          tree: {
            properties: {
              sha: {
                examples: ["827efc6d56897b048c772eb4087f854f46256132"],
                type: "string",
              },
              url: {
                examples: [
                  "https://api.github.com/repos/octocat/Hello-World/tree/827efc6d56897b048c772eb4087f854f46256132",
                ],
                format: "uri",
                type: "string",
              },
            },
            required: ["sha", "url"],
            type: "object",
          },
          url: {
            examples: [
              "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
            ],
            format: "uri",
            type: "string",
          },
          verification: {
            properties: {
              payload: {
                type: ["string", "null"],
              },
              reason: {
                type: "string",
              },
              signature: {
                type: ["string", "null"],
              },
              verified: {
                type: "boolean",
              },
            },
            required: ["verified", "reason", "payload", "signature"],
            title: "Verification",
            type: "object",
          },
        },
        required: ["author", "committer", "comment_count", "message", "tree", "url"],
        type: "object",
      },
      committer: {
        anyOf: [
          {
            type: "null",
          },
          {
            description: "A GitHub user.",
            properties: {
              avatar_url: {
                examples: ["https://github.com/images/error/octocat_happy.gif"],
                format: "uri",
                type: "string",
              },
              email: {
                type: ["string", "null"],
              },
              events_url: {
                examples: ["https://api.github.com/users/octocat/events{/privacy}"],
                type: "string",
              },
              followers_url: {
                examples: ["https://api.github.com/users/octocat/followers"],
                format: "uri",
                type: "string",
              },
              following_url: {
                examples: ["https://api.github.com/users/octocat/following{/other_user}"],
                type: "string",
              },
              gists_url: {
                examples: ["https://api.github.com/users/octocat/gists{/gist_id}"],
                type: "string",
              },
              gravatar_id: {
                examples: ["41d064eb2195891e12d0413f63227ea7"],
                type: ["string", "null"],
              },
              html_url: {
                examples: ["https://github.com/octocat"],
                format: "uri",
                type: "string",
              },
              id: {
                examples: [1],
                type: "integer",
              },
              login: {
                examples: ["octocat"],
                type: "string",
              },
              name: {
                type: ["string", "null"],
              },
              node_id: {
                examples: ["MDQ6VXNlcjE="],
                type: "string",
              },
              organizations_url: {
                examples: ["https://api.github.com/users/octocat/orgs"],
                format: "uri",
                type: "string",
              },
              received_events_url: {
                examples: ["https://api.github.com/users/octocat/received_events"],
                format: "uri",
                type: "string",
              },
              repos_url: {
                examples: ["https://api.github.com/users/octocat/repos"],
                format: "uri",
                type: "string",
              },
              site_admin: {
                type: "boolean",
              },
              starred_at: {
                examples: ['"2020-07-09T00:17:55Z"'],
                type: "string",
              },
              starred_url: {
                examples: ["https://api.github.com/users/octocat/starred{/owner}{/repo}"],
                type: "string",
              },
              subscriptions_url: {
                examples: ["https://api.github.com/users/octocat/subscriptions"],
                format: "uri",
                type: "string",
              },
              type: {
                examples: ["User"],
                type: "string",
              },
              url: {
                examples: ["https://api.github.com/users/octocat"],
                format: "uri",
                type: "string",
              },
            },
            required: [
              "avatar_url",
              "events_url",
              "followers_url",
              "following_url",
              "gists_url",
              "gravatar_id",
              "html_url",
              "id",
              "node_id",
              "login",
              "organizations_url",
              "received_events_url",
              "repos_url",
              "site_admin",
              "starred_url",
              "subscriptions_url",
              "type",
              "url",
            ],
            title: "Simple User",
            type: "object",
          },
        ],
      },
      files: {
        items: {
          description: "Diff Entry",
          properties: {
            additions: {
              examples: [103],
              type: "integer",
            },
            blob_url: {
              examples: [
                "https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt",
              ],
              format: "uri",
              type: "string",
            },
            changes: {
              examples: [124],
              type: "integer",
            },
            contents_url: {
              examples: [
                "https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e",
              ],
              format: "uri",
              type: "string",
            },
            deletions: {
              examples: [21],
              type: "integer",
            },
            filename: {
              examples: ["file1.txt"],
              type: "string",
            },
            patch: {
              examples: ["@@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test"],
              type: "string",
            },
            previous_filename: {
              examples: ["file.txt"],
              type: "string",
            },
            raw_url: {
              examples: [
                "https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt",
              ],
              format: "uri",
              type: "string",
            },
            sha: {
              examples: ["bbcd538c8e72b8c175046e27cc8f907076331401"],
              type: "string",
            },
            status: {
              enum: ["added", "removed", "modified", "renamed", "copied", "changed", "unchanged"],
              examples: ["added"],
              type: "string",
            },
          },
          required: [
            "additions",
            "blob_url",
            "changes",
            "contents_url",
            "deletions",
            "filename",
            "raw_url",
            "sha",
            "status",
          ],
          title: "Diff Entry",
          type: "object",
        },
        type: "array",
      },
      html_url: {
        examples: [
          "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
        ],
        format: "uri",
        type: "string",
      },
      node_id: {
        examples: ["MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ=="],
        type: "string",
      },
      parents: {
        items: {
          properties: {
            html_url: {
              examples: [
                "https://github.com/octocat/Hello-World/commit/7638417db6d59f3c431d3e1f261cc637155684cd",
              ],
              format: "uri",
              type: "string",
            },
            sha: {
              examples: ["7638417db6d59f3c431d3e1f261cc637155684cd"],
              type: "string",
            },
            url: {
              examples: [
                "https://api.github.com/repos/octocat/Hello-World/commits/7638417db6d59f3c431d3e1f261cc637155684cd",
              ],
              format: "uri",
              type: "string",
            },
          },
          required: ["sha", "url"],
          type: "object",
        },
        type: "array",
      },
      sha: {
        examples: ["6dcb09b5b57875f334f61aebed695e2e4193db5e"],
        type: "string",
      },
      stats: {
        properties: {
          additions: {
            type: "integer",
          },
          deletions: {
            type: "integer",
          },
          total: {
            type: "integer",
          },
        },
        type: "object",
      },
      url: {
        examples: [
          "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
        ],
        format: "uri",
        type: "string",
      },
    },
    required: [
      "url",
      "sha",
      "node_id",
      "html_url",
      "comments_url",
      "commit",
      "author",
      "committer",
      "parents",
    ],
    title: "Commit",
    type: "object",
  },
  type: "array",
} as const;
