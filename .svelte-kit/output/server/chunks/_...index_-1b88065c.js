var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _regex, _urlReflector;
import { n as noop, a as safe_not_equal, b as subscribe, r as run_all, i as is_function, g as get_store_value, d as getContext, c as create_ssr_component, s as setContext, v as validate_component, m as missing_component, f as globals, o as onDestroy } from "./index-1abd510b.js";
var routes = {
  "meta": {},
  "id": "_default",
  "module": () => import("./_module-823b6fcf.js"),
  "file": {
    "path": "src/pages/_module.svelte",
    "dir": "src/pages",
    "base": "_module.svelte",
    "ext": ".svelte",
    "name": "_module"
  },
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {
        "order": 1
      },
      "id": "_default_1_home",
      "name": "home",
      "module": false,
      "file": {
        "path": "src/pages/1.home",
        "dir": "src/pages",
        "base": "1.home",
        "ext": ".home",
        "name": "1.home"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_1_home_index_svelte",
          "name": "index",
          "module": () => import("./index-af807f66.js"),
          "file": {
            "path": "src/pages/1.home/index.svelte",
            "dir": "src/pages/1.home",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "children": []
        }
      ]
    },
    {
      "meta": {
        "repos": [
          {
            "data": {
              "id": 210910840,
              "node_id": "MDEwOlJlcG9zaXRvcnkyMTA5MTA4NDA=",
              "name": "routify",
              "full_name": "roxiness/routify",
              "private": false,
              "owner": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "html_url": "https://github.com/roxiness/routify",
              "description": "Automated Svelte routes",
              "fork": false,
              "url": "https://api.github.com/repos/roxiness/routify",
              "forks_url": "https://api.github.com/repos/roxiness/routify/forks",
              "keys_url": "https://api.github.com/repos/roxiness/routify/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/roxiness/routify/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/roxiness/routify/teams",
              "hooks_url": "https://api.github.com/repos/roxiness/routify/hooks",
              "issue_events_url": "https://api.github.com/repos/roxiness/routify/issues/events{/number}",
              "events_url": "https://api.github.com/repos/roxiness/routify/events",
              "assignees_url": "https://api.github.com/repos/roxiness/routify/assignees{/user}",
              "branches_url": "https://api.github.com/repos/roxiness/routify/branches{/branch}",
              "tags_url": "https://api.github.com/repos/roxiness/routify/tags",
              "blobs_url": "https://api.github.com/repos/roxiness/routify/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/roxiness/routify/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/roxiness/routify/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/roxiness/routify/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/roxiness/routify/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/roxiness/routify/languages",
              "stargazers_url": "https://api.github.com/repos/roxiness/routify/stargazers",
              "contributors_url": "https://api.github.com/repos/roxiness/routify/contributors",
              "subscribers_url": "https://api.github.com/repos/roxiness/routify/subscribers",
              "subscription_url": "https://api.github.com/repos/roxiness/routify/subscription",
              "commits_url": "https://api.github.com/repos/roxiness/routify/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/roxiness/routify/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/roxiness/routify/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/roxiness/routify/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/roxiness/routify/contents/{+path}",
              "compare_url": "https://api.github.com/repos/roxiness/routify/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/roxiness/routify/merges",
              "archive_url": "https://api.github.com/repos/roxiness/routify/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/roxiness/routify/downloads",
              "issues_url": "https://api.github.com/repos/roxiness/routify/issues{/number}",
              "pulls_url": "https://api.github.com/repos/roxiness/routify/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/roxiness/routify/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/roxiness/routify/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/roxiness/routify/labels{/name}",
              "releases_url": "https://api.github.com/repos/roxiness/routify/releases{/id}",
              "deployments_url": "https://api.github.com/repos/roxiness/routify/deployments",
              "created_at": "2019-09-25T18:13:42Z",
              "updated_at": "2022-01-28T02:56:51Z",
              "pushed_at": "2022-01-27T18:07:42Z",
              "git_url": "git://github.com/roxiness/routify.git",
              "ssh_url": "git@github.com:roxiness/routify.git",
              "clone_url": "https://github.com/roxiness/routify.git",
              "svn_url": "https://github.com/roxiness/routify",
              "homepage": "https://routify.dev",
              "size": 6050,
              "stargazers_count": 1439,
              "watchers_count": 1439,
              "language": "JavaScript",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": false,
              "forks_count": 62,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 24,
              "license": {
                "key": "mit",
                "name": "MIT License",
                "spdx_id": "MIT",
                "url": "https://api.github.com/licenses/mit",
                "node_id": "MDc6TGljZW5zZTEz"
              },
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 62,
              "open_issues": 24,
              "watchers": 1439,
              "default_branch": "master",
              "temp_clone_token": null,
              "organization": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "network_count": 62,
              "subscribers_count": 23
            },
            "readme": () => import("./div_align_center_n_i-2054--1ivb1p-4c722558.js").then((r) => r.default)
          },
          {
            "data": {
              "id": 299939642,
              "node_id": "MDEwOlJlcG9zaXRvcnkyOTk5Mzk2NDI=",
              "name": "configent",
              "full_name": "roxiness/configent",
              "private": false,
              "owner": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "html_url": "https://github.com/roxiness/configent",
              "description": "no fuzz configurator",
              "fork": false,
              "url": "https://api.github.com/repos/roxiness/configent",
              "forks_url": "https://api.github.com/repos/roxiness/configent/forks",
              "keys_url": "https://api.github.com/repos/roxiness/configent/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/roxiness/configent/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/roxiness/configent/teams",
              "hooks_url": "https://api.github.com/repos/roxiness/configent/hooks",
              "issue_events_url": "https://api.github.com/repos/roxiness/configent/issues/events{/number}",
              "events_url": "https://api.github.com/repos/roxiness/configent/events",
              "assignees_url": "https://api.github.com/repos/roxiness/configent/assignees{/user}",
              "branches_url": "https://api.github.com/repos/roxiness/configent/branches{/branch}",
              "tags_url": "https://api.github.com/repos/roxiness/configent/tags",
              "blobs_url": "https://api.github.com/repos/roxiness/configent/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/roxiness/configent/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/roxiness/configent/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/roxiness/configent/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/roxiness/configent/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/roxiness/configent/languages",
              "stargazers_url": "https://api.github.com/repos/roxiness/configent/stargazers",
              "contributors_url": "https://api.github.com/repos/roxiness/configent/contributors",
              "subscribers_url": "https://api.github.com/repos/roxiness/configent/subscribers",
              "subscription_url": "https://api.github.com/repos/roxiness/configent/subscription",
              "commits_url": "https://api.github.com/repos/roxiness/configent/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/roxiness/configent/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/roxiness/configent/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/roxiness/configent/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/roxiness/configent/contents/{+path}",
              "compare_url": "https://api.github.com/repos/roxiness/configent/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/roxiness/configent/merges",
              "archive_url": "https://api.github.com/repos/roxiness/configent/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/roxiness/configent/downloads",
              "issues_url": "https://api.github.com/repos/roxiness/configent/issues{/number}",
              "pulls_url": "https://api.github.com/repos/roxiness/configent/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/roxiness/configent/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/roxiness/configent/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/roxiness/configent/labels{/name}",
              "releases_url": "https://api.github.com/repos/roxiness/configent/releases{/id}",
              "deployments_url": "https://api.github.com/repos/roxiness/configent/deployments",
              "created_at": "2020-09-30T14:06:51Z",
              "updated_at": "2021-08-06T00:46:02Z",
              "pushed_at": "2021-12-20T15:46:25Z",
              "git_url": "git://github.com/roxiness/configent.git",
              "ssh_url": "git@github.com:roxiness/configent.git",
              "clone_url": "https://github.com/roxiness/configent.git",
              "svn_url": "https://github.com/roxiness/configent",
              "homepage": null,
              "size": 536,
              "stargazers_count": 10,
              "watchers_count": 10,
              "language": "JavaScript",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": false,
              "forks_count": 1,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 1,
              "license": null,
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 1,
              "open_issues": 1,
              "watchers": 10,
              "default_branch": "master",
              "temp_clone_token": null,
              "organization": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "network_count": 1,
              "subscribers_count": 2
            },
            "readme": () => import("./div_align_center_n_i-6042-f6acgr-110eaebd.js").then((r) => r.default)
          },
          {
            "data": {
              "id": 236830441,
              "node_id": "MDEwOlJlcG9zaXRvcnkyMzY4MzA0NDE=",
              "name": "tossr",
              "full_name": "roxiness/tossr",
              "private": false,
              "owner": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "html_url": "https://github.com/roxiness/tossr",
              "description": "Universal SSR renderer powered by JSDOM",
              "fork": false,
              "url": "https://api.github.com/repos/roxiness/tossr",
              "forks_url": "https://api.github.com/repos/roxiness/tossr/forks",
              "keys_url": "https://api.github.com/repos/roxiness/tossr/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/roxiness/tossr/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/roxiness/tossr/teams",
              "hooks_url": "https://api.github.com/repos/roxiness/tossr/hooks",
              "issue_events_url": "https://api.github.com/repos/roxiness/tossr/issues/events{/number}",
              "events_url": "https://api.github.com/repos/roxiness/tossr/events",
              "assignees_url": "https://api.github.com/repos/roxiness/tossr/assignees{/user}",
              "branches_url": "https://api.github.com/repos/roxiness/tossr/branches{/branch}",
              "tags_url": "https://api.github.com/repos/roxiness/tossr/tags",
              "blobs_url": "https://api.github.com/repos/roxiness/tossr/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/roxiness/tossr/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/roxiness/tossr/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/roxiness/tossr/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/roxiness/tossr/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/roxiness/tossr/languages",
              "stargazers_url": "https://api.github.com/repos/roxiness/tossr/stargazers",
              "contributors_url": "https://api.github.com/repos/roxiness/tossr/contributors",
              "subscribers_url": "https://api.github.com/repos/roxiness/tossr/subscribers",
              "subscription_url": "https://api.github.com/repos/roxiness/tossr/subscription",
              "commits_url": "https://api.github.com/repos/roxiness/tossr/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/roxiness/tossr/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/roxiness/tossr/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/roxiness/tossr/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/roxiness/tossr/contents/{+path}",
              "compare_url": "https://api.github.com/repos/roxiness/tossr/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/roxiness/tossr/merges",
              "archive_url": "https://api.github.com/repos/roxiness/tossr/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/roxiness/tossr/downloads",
              "issues_url": "https://api.github.com/repos/roxiness/tossr/issues{/number}",
              "pulls_url": "https://api.github.com/repos/roxiness/tossr/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/roxiness/tossr/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/roxiness/tossr/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/roxiness/tossr/labels{/name}",
              "releases_url": "https://api.github.com/repos/roxiness/tossr/releases{/id}",
              "deployments_url": "https://api.github.com/repos/roxiness/tossr/deployments",
              "created_at": "2020-01-28T20:08:35Z",
              "updated_at": "2021-12-29T03:02:43Z",
              "pushed_at": "2021-12-20T15:48:06Z",
              "git_url": "git://github.com/roxiness/tossr.git",
              "ssh_url": "git@github.com:roxiness/tossr.git",
              "clone_url": "https://github.com/roxiness/tossr.git",
              "svn_url": "https://github.com/roxiness/tossr",
              "homepage": "",
              "size": 203,
              "stargazers_count": 34,
              "watchers_count": 34,
              "language": "JavaScript",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": false,
              "forks_count": 6,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 3,
              "license": null,
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 6,
              "open_issues": 3,
              "watchers": 34,
              "default_branch": "master",
              "temp_clone_token": null,
              "organization": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "network_count": 6,
              "subscribers_count": 4
            },
            "readme": () => import("./div_align_center_n_i-4921--kzwpwn-7bc26563.js").then((r) => r.default)
          },
          {
            "data": {
              "id": 324626484,
              "node_id": "MDEwOlJlcG9zaXRvcnkzMjQ2MjY0ODQ=",
              "name": "stackmix",
              "full_name": "roxiness/stackmix",
              "private": false,
              "owner": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "html_url": "https://github.com/roxiness/stackmix",
              "description": "A collection of templates for Routify.",
              "fork": false,
              "url": "https://api.github.com/repos/roxiness/stackmix",
              "forks_url": "https://api.github.com/repos/roxiness/stackmix/forks",
              "keys_url": "https://api.github.com/repos/roxiness/stackmix/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/roxiness/stackmix/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/roxiness/stackmix/teams",
              "hooks_url": "https://api.github.com/repos/roxiness/stackmix/hooks",
              "issue_events_url": "https://api.github.com/repos/roxiness/stackmix/issues/events{/number}",
              "events_url": "https://api.github.com/repos/roxiness/stackmix/events",
              "assignees_url": "https://api.github.com/repos/roxiness/stackmix/assignees{/user}",
              "branches_url": "https://api.github.com/repos/roxiness/stackmix/branches{/branch}",
              "tags_url": "https://api.github.com/repos/roxiness/stackmix/tags",
              "blobs_url": "https://api.github.com/repos/roxiness/stackmix/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/roxiness/stackmix/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/roxiness/stackmix/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/roxiness/stackmix/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/roxiness/stackmix/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/roxiness/stackmix/languages",
              "stargazers_url": "https://api.github.com/repos/roxiness/stackmix/stargazers",
              "contributors_url": "https://api.github.com/repos/roxiness/stackmix/contributors",
              "subscribers_url": "https://api.github.com/repos/roxiness/stackmix/subscribers",
              "subscription_url": "https://api.github.com/repos/roxiness/stackmix/subscription",
              "commits_url": "https://api.github.com/repos/roxiness/stackmix/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/roxiness/stackmix/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/roxiness/stackmix/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/roxiness/stackmix/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/roxiness/stackmix/contents/{+path}",
              "compare_url": "https://api.github.com/repos/roxiness/stackmix/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/roxiness/stackmix/merges",
              "archive_url": "https://api.github.com/repos/roxiness/stackmix/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/roxiness/stackmix/downloads",
              "issues_url": "https://api.github.com/repos/roxiness/stackmix/issues{/number}",
              "pulls_url": "https://api.github.com/repos/roxiness/stackmix/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/roxiness/stackmix/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/roxiness/stackmix/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/roxiness/stackmix/labels{/name}",
              "releases_url": "https://api.github.com/repos/roxiness/stackmix/releases{/id}",
              "deployments_url": "https://api.github.com/repos/roxiness/stackmix/deployments",
              "created_at": "2020-12-26T20:02:30Z",
              "updated_at": "2022-01-22T17:08:32Z",
              "pushed_at": "2021-12-26T18:55:25Z",
              "git_url": "git://github.com/roxiness/stackmix.git",
              "ssh_url": "git@github.com:roxiness/stackmix.git",
              "clone_url": "https://github.com/roxiness/stackmix.git",
              "svn_url": "https://github.com/roxiness/stackmix",
              "homepage": null,
              "size": 387,
              "stargazers_count": 22,
              "watchers_count": 22,
              "language": "JavaScript",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": false,
              "forks_count": 3,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 4,
              "license": null,
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 3,
              "open_issues": 4,
              "watchers": 22,
              "default_branch": "master",
              "temp_clone_token": null,
              "organization": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "network_count": 3,
              "subscribers_count": 7
            },
            "readme": () => import("./p_align_center_n_img-1382--j17q2v-11fc84e0.js").then((r) => r.default)
          },
          {
            "data": {
              "id": 314868584,
              "node_id": "MDEwOlJlcG9zaXRvcnkzMTQ4Njg1ODQ=",
              "name": "poindexter",
              "full_name": "roxiness/poindexter",
              "private": false,
              "owner": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "html_url": "https://github.com/roxiness/poindexter",
              "description": "Search engine for your static site",
              "fork": false,
              "url": "https://api.github.com/repos/roxiness/poindexter",
              "forks_url": "https://api.github.com/repos/roxiness/poindexter/forks",
              "keys_url": "https://api.github.com/repos/roxiness/poindexter/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/roxiness/poindexter/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/roxiness/poindexter/teams",
              "hooks_url": "https://api.github.com/repos/roxiness/poindexter/hooks",
              "issue_events_url": "https://api.github.com/repos/roxiness/poindexter/issues/events{/number}",
              "events_url": "https://api.github.com/repos/roxiness/poindexter/events",
              "assignees_url": "https://api.github.com/repos/roxiness/poindexter/assignees{/user}",
              "branches_url": "https://api.github.com/repos/roxiness/poindexter/branches{/branch}",
              "tags_url": "https://api.github.com/repos/roxiness/poindexter/tags",
              "blobs_url": "https://api.github.com/repos/roxiness/poindexter/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/roxiness/poindexter/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/roxiness/poindexter/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/roxiness/poindexter/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/roxiness/poindexter/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/roxiness/poindexter/languages",
              "stargazers_url": "https://api.github.com/repos/roxiness/poindexter/stargazers",
              "contributors_url": "https://api.github.com/repos/roxiness/poindexter/contributors",
              "subscribers_url": "https://api.github.com/repos/roxiness/poindexter/subscribers",
              "subscription_url": "https://api.github.com/repos/roxiness/poindexter/subscription",
              "commits_url": "https://api.github.com/repos/roxiness/poindexter/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/roxiness/poindexter/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/roxiness/poindexter/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/roxiness/poindexter/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/roxiness/poindexter/contents/{+path}",
              "compare_url": "https://api.github.com/repos/roxiness/poindexter/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/roxiness/poindexter/merges",
              "archive_url": "https://api.github.com/repos/roxiness/poindexter/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/roxiness/poindexter/downloads",
              "issues_url": "https://api.github.com/repos/roxiness/poindexter/issues{/number}",
              "pulls_url": "https://api.github.com/repos/roxiness/poindexter/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/roxiness/poindexter/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/roxiness/poindexter/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/roxiness/poindexter/labels{/name}",
              "releases_url": "https://api.github.com/repos/roxiness/poindexter/releases{/id}",
              "deployments_url": "https://api.github.com/repos/roxiness/poindexter/deployments",
              "created_at": "2020-11-21T17:41:49Z",
              "updated_at": "2022-01-24T18:37:20Z",
              "pushed_at": "2021-05-19T11:06:34Z",
              "git_url": "git://github.com/roxiness/poindexter.git",
              "ssh_url": "git@github.com:roxiness/poindexter.git",
              "clone_url": "https://github.com/roxiness/poindexter.git",
              "svn_url": "https://github.com/roxiness/poindexter",
              "homepage": "",
              "size": 647,
              "stargazers_count": 73,
              "watchers_count": 73,
              "language": "JavaScript",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": false,
              "forks_count": 2,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 0,
              "license": null,
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 2,
              "open_issues": 0,
              "watchers": 73,
              "default_branch": "master",
              "temp_clone_token": null,
              "organization": {
                "login": "roxiness",
                "id": 58428864,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/roxiness",
                "html_url": "https://github.com/roxiness",
                "followers_url": "https://api.github.com/users/roxiness/followers",
                "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                "organizations_url": "https://api.github.com/users/roxiness/orgs",
                "repos_url": "https://api.github.com/users/roxiness/repos",
                "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                "received_events_url": "https://api.github.com/users/roxiness/received_events",
                "type": "Organization",
                "site_admin": false
              },
              "network_count": 2,
              "subscribers_count": 3
            },
            "readme": () => import("./div_align_center_n_i-3807--tsvbbz-ef788025.js").then((r) => r.default)
          },
          {
            "data": {
              "id": 407183730,
              "node_id": "MDEwOlJlcG9zaXRvcnk0MDcxODM3MzA=",
              "name": "consolite",
              "full_name": "jakobrosenberg/consolite",
              "private": false,
              "owner": {
                "login": "jakobrosenberg",
                "id": 4153004,
                "node_id": "MDQ6VXNlcjQxNTMwMDQ=",
                "avatar_url": "https://avatars.githubusercontent.com/u/4153004?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/jakobrosenberg",
                "html_url": "https://github.com/jakobrosenberg",
                "followers_url": "https://api.github.com/users/jakobrosenberg/followers",
                "following_url": "https://api.github.com/users/jakobrosenberg/following{/other_user}",
                "gists_url": "https://api.github.com/users/jakobrosenberg/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/jakobrosenberg/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/jakobrosenberg/subscriptions",
                "organizations_url": "https://api.github.com/users/jakobrosenberg/orgs",
                "repos_url": "https://api.github.com/users/jakobrosenberg/repos",
                "events_url": "https://api.github.com/users/jakobrosenberg/events{/privacy}",
                "received_events_url": "https://api.github.com/users/jakobrosenberg/received_events",
                "type": "User",
                "site_admin": false
              },
              "html_url": "https://github.com/jakobrosenberg/consolite",
              "description": "tiny logger that features line numbers, log levels, log prefixes and nesting",
              "fork": false,
              "url": "https://api.github.com/repos/jakobrosenberg/consolite",
              "forks_url": "https://api.github.com/repos/jakobrosenberg/consolite/forks",
              "keys_url": "https://api.github.com/repos/jakobrosenberg/consolite/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/jakobrosenberg/consolite/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/jakobrosenberg/consolite/teams",
              "hooks_url": "https://api.github.com/repos/jakobrosenberg/consolite/hooks",
              "issue_events_url": "https://api.github.com/repos/jakobrosenberg/consolite/issues/events{/number}",
              "events_url": "https://api.github.com/repos/jakobrosenberg/consolite/events",
              "assignees_url": "https://api.github.com/repos/jakobrosenberg/consolite/assignees{/user}",
              "branches_url": "https://api.github.com/repos/jakobrosenberg/consolite/branches{/branch}",
              "tags_url": "https://api.github.com/repos/jakobrosenberg/consolite/tags",
              "blobs_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/jakobrosenberg/consolite/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/jakobrosenberg/consolite/languages",
              "stargazers_url": "https://api.github.com/repos/jakobrosenberg/consolite/stargazers",
              "contributors_url": "https://api.github.com/repos/jakobrosenberg/consolite/contributors",
              "subscribers_url": "https://api.github.com/repos/jakobrosenberg/consolite/subscribers",
              "subscription_url": "https://api.github.com/repos/jakobrosenberg/consolite/subscription",
              "commits_url": "https://api.github.com/repos/jakobrosenberg/consolite/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/jakobrosenberg/consolite/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/jakobrosenberg/consolite/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/jakobrosenberg/consolite/contents/{+path}",
              "compare_url": "https://api.github.com/repos/jakobrosenberg/consolite/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/jakobrosenberg/consolite/merges",
              "archive_url": "https://api.github.com/repos/jakobrosenberg/consolite/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/jakobrosenberg/consolite/downloads",
              "issues_url": "https://api.github.com/repos/jakobrosenberg/consolite/issues{/number}",
              "pulls_url": "https://api.github.com/repos/jakobrosenberg/consolite/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/jakobrosenberg/consolite/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/jakobrosenberg/consolite/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/jakobrosenberg/consolite/labels{/name}",
              "releases_url": "https://api.github.com/repos/jakobrosenberg/consolite/releases{/id}",
              "deployments_url": "https://api.github.com/repos/jakobrosenberg/consolite/deployments",
              "created_at": "2021-09-16T13:52:08Z",
              "updated_at": "2022-01-07T11:12:48Z",
              "pushed_at": "2022-01-10T07:51:29Z",
              "git_url": "git://github.com/jakobrosenberg/consolite.git",
              "ssh_url": "git@github.com:jakobrosenberg/consolite.git",
              "clone_url": "https://github.com/jakobrosenberg/consolite.git",
              "svn_url": "https://github.com/jakobrosenberg/consolite",
              "homepage": null,
              "size": 236,
              "stargazers_count": 2,
              "watchers_count": 2,
              "language": "JavaScript",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": false,
              "forks_count": 1,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 0,
              "license": null,
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 1,
              "open_issues": 0,
              "watchers": 2,
              "default_branch": "main",
              "temp_clone_token": null,
              "network_count": 1,
              "subscribers_count": 1
            },
            "readme": () => import("./img_src_https_github-2871--9idip6-92333768.js").then((r) => r.default)
          }
        ],
        "order": 2
      },
      "id": "_default_2_projects",
      "name": "projects",
      "module": () => import("./_module-1476b092.js"),
      "file": {
        "path": "src/pages/2.projects/_module.svelte",
        "dir": "src/pages/2.projects",
        "base": "_module.svelte",
        "ext": ".svelte",
        "name": "_module"
      },
      "children": [
        {
          "meta": {
            "dynamic": true
          },
          "id": "_default_2_projects__project__svelte",
          "name": "[project]",
          "module": () => import("./_project_-deef114d.js"),
          "file": {
            "path": "src/pages/2.projects/[project].svelte",
            "dir": "src/pages/2.projects",
            "base": "[project].svelte",
            "ext": ".svelte",
            "name": "[project]"
          },
          "children": []
        }
      ]
    },
    {
      "meta": {
        "title": "about me",
        "order": 3
      },
      "id": "_default_3_about_me",
      "name": "about-me",
      "module": () => import("./_module-4e3ecfc3.js"),
      "file": {
        "path": "src/pages/3.about-me/_module.svelte",
        "dir": "src/pages/3.about-me",
        "base": "_module.svelte",
        "ext": ".svelte",
        "name": "_module"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_3_about_me_index_svelte",
          "name": "index",
          "module": () => import("./index-b6935962.js"),
          "file": {
            "path": "src/pages/3.about-me/index.svelte",
            "dir": "src/pages/3.about-me",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default__loader_svelte",
      "name": "_loader",
      "module": () => import("./_loader-fce8554a.js"),
      "file": {
        "path": "src/pages/_loader.svelte",
        "dir": "src/pages",
        "base": "_loader.svelte",
        "ext": ".svelte",
        "name": "_loader"
      },
      "children": []
    },
    {
      "meta": {},
      "id": "_default__navigation_svelte",
      "name": "_navigation",
      "module": () => import("./_navigation-fb8adec4.js"),
      "file": {
        "path": "src/pages/_navigation.svelte",
        "dir": "src/pages",
        "base": "_navigation.svelte",
        "ext": ".svelte",
        "name": "_navigation"
      },
      "children": []
    },
    {
      "meta": {},
      "id": "_default_index_svelte",
      "name": "index",
      "module": () => import("./index-f35517aa.js"),
      "file": {
        "path": "src/pages/index.svelte",
        "dir": "src/pages",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "children": []
    }
  ]
};
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
const spreadsLast = (node) => node.name.match(/\[\.\.\.(.+)\]/) ? 1 : -1;
const getNearestAncestorNodeWithSpreadParam = (routeFragments) => {
  for (const fragment of [...routeFragments].reverse()) {
    for (const node of fragment.node.parent?.children || []) {
      const match = node.name.match(/\[\.\.\.(.+)\]/);
      if (match)
        return node;
    }
  }
};
const getUrlFragments = (url) => url.replace(/[?#].+/, "").replace(/\/$/, "").split("/").slice(1);
const indexOfNode = (fragments, node) => fragments.findIndex((fragment) => fragment.node === node);
const URIDecodeObject = (obj) => Object.entries(obj).reduce((_return, [key, value]) => ({
  ..._return,
  [key]: decodeURI(value)
}), {});
class RouteFragment {
  constructor(route, node, urlFragment) {
    __publicField(this, "_params", {});
    this.route = route;
    this.node = node;
    this.load = void 0;
    this.urlFragment = urlFragment;
    Object.defineProperty(this, "route", { enumerable: false });
  }
  get params() {
    return this._params;
  }
  setParams(params) {
    this._params = URIDecodeObject(params);
  }
  getParamsFromFragment() {
    const { getFieldsFromName, getValuesFromPath, mapFieldsWithValues } = this.route.router.instance.utils;
    return mapFieldsWithValues(getFieldsFromName(this.node.name), getValuesFromPath(this.node.regex, this.urlFragment));
  }
}
const URL_STATES = ["pushState", "replaceState", "popState"];
class Route {
  constructor(router2, url, mode) {
    __publicField(this, "allFragments", []);
    __publicField(this, "loaded");
    __publicField(this, "load", {
      status: 200,
      error: null,
      maxage: null,
      props: {},
      redirect: null
    });
    this.router = router2;
    this.url = url;
    this.mode = mode;
    if (!router2.rootNode) {
      this.router.log.error("Can't navigate without a rootNode");
      const err = new Error("Can't navigate without a rootNode");
      Object.assign(err, { routify: { router: router2 } });
      throw err;
    }
    if (!URL_STATES.includes(mode))
      throw new Error("url.mode must be pushState, replaceState or popState");
    this.allFragments = this._createFragments();
  }
  get fragments() {
    const moduleFragments = this.allFragments.filter((f) => f.node.module);
    return this.router.transformFragments.run(moduleFragments);
  }
  get params() {
    const match = this.url.match(/\?.+/);
    const query = match && match[0] || "";
    return Object.assign({}, ...this.allFragments.map((fragment) => fragment.params), this.router.queryHandler.parse(query, this));
  }
  async loadRoute() {
    const { router: router2 } = this;
    const pipeline = [
      this.runBeforeUrlChangeHooks,
      this.loadComponents,
      this.runGuards,
      this.runPreloads
    ];
    this.loaded = new Promise(async (resolve, reject) => {
      for (const pretask of pipeline) {
        const passedPreTask = await pretask.bind(this)();
        const routerHasNewerPendingRoute = this !== router2.pendingRoute.get();
        if (!router2.pendingRoute.get()) {
          resolve({ route: router2.activeRoute.get() });
          return;
        } else if (routerHasNewerPendingRoute) {
          router2.pendingRoute.get().loaded.then(resolve).catch(reject);
          return;
        } else if (!passedPreTask) {
          router2.pendingRoute.set(null);
          return;
        }
      }
      const $activeRoute = this.router.activeRoute.get();
      if ($activeRoute)
        router2.history.push($activeRoute);
      router2.activeRoute.set(this);
      router2.afterUrlChange.run({
        route: this,
        history: [...router2.history].reverse()
      });
      router2.pendingRoute.set(null);
      resolve({ route: this });
    });
    return this.loaded;
  }
  async loadComponents() {
    await Promise.all(this.fragments.map(async (fragment) => {
      const module = await fragment.node.module();
      fragment.node.module = () => module;
    }));
    return true;
  }
  async runPreloads() {
    const ctx = {
      route: this,
      node: [...this.fragments].pop().node
    };
    for (const fragment of this.fragments) {
      if (fragment.node.module()?.load) {
        fragment.load = await fragment.node.module().load(ctx);
        Object.assign(this.load, fragment.load);
        if (this.load.redirect)
          return this.router.url.replace(this.load.redirect);
      }
    }
    return this;
  }
  async runGuards() {
    const components = this.fragments.map((fragment) => fragment.node.module()).filter((module) => module?.guard);
    for (const module of components) {
      console.warn('"guard" will be deprecated. Please use "load.redirect" instead.');
      const result = await module.guard(this);
      if (!result)
        return false;
    }
    return true;
  }
  async runBeforeUrlChangeHooks() {
    return await this.router.beforeUrlChange.run({ route: this });
  }
  _createFragments() {
    const { url = "", router: router2 } = this;
    const { rootNode } = router2;
    let currentSpreadParam = [];
    let currentNode = rootNode;
    const createFragment = (node, urlFragment, spreadParam) => {
      const fragment = new RouteFragment(this, node, urlFragment);
      const spreadMatch = node.name.match(/\[\.\.\.(.+)\]/);
      if (spreadMatch)
        spreadParam.push(urlFragment);
      else
        spreadParam = [];
      if (spreadMatch)
        fragment.setParams({ [spreadMatch[1]]: spreadParam });
      else
        fragment.setParams(fragment.getParamsFromFragment());
      return fragment;
    };
    const urlFragments = getUrlFragments(url);
    const routeFragments = [new RouteFragment(this, currentNode, "")];
    for (let ufIndex = 0; ufIndex < urlFragments.length; ufIndex++) {
      const urlFragment = urlFragments[ufIndex];
      const children = currentNode.children.filter((child2) => !child2.name.startsWith("_"));
      const child = children.find((child2) => child2.name === urlFragment) || children.sort(spreadsLast).find((child2) => child2.regex.test(urlFragment));
      if (child) {
        routeFragments.push(createFragment(child, urlFragment, currentSpreadParam));
        currentNode = child;
      } else if (currentSpreadParam.length) {
        currentSpreadParam.push(urlFragment);
      } else {
        const nearestSpreadNode = getNearestAncestorNodeWithSpreadParam(routeFragments);
        if (nearestSpreadNode) {
          const nodeIndex = indexOfNode(routeFragments, nearestSpreadNode);
          const removed = routeFragments.splice(nodeIndex);
          ufIndex = ufIndex - removed.length;
          routeFragments.push(createFragment(nearestSpreadNode, urlFragments[ufIndex], currentSpreadParam));
          currentNode = nearestSpreadNode;
        } else {
          const fallback = currentNode._fallback;
          if (!fallback) {
            throw new Error(`router: "${router2.name || "[default]"}" could not find route: ${url}`);
          }
          routeFragments.splice(fallback.level);
          routeFragments.push(new RouteFragment(this, fallback, ""));
          break;
        }
      }
    }
    let lastNode = routeFragments[routeFragments.length - 1].node;
    while (lastNode) {
      lastNode = lastNode.children.find((node) => node.name === "index");
      if (lastNode)
        routeFragments.push(new RouteFragment(this, lastNode, ""));
    }
    if (!routeFragments.filter(({ node }) => node.module).length)
      throw new Error(`could not find route: ${url}`);
    return routeFragments;
  }
}
const pathAndParamsToUrl = (path, params = {}, queryHandler) => {
  Object.entries(params).forEach(([key, val]) => {
    if (path.includes(`[${key}]`)) {
      path = path.replace(`[${key}]`, val);
      delete params[key];
    }
  });
  return path + queryHandler(params);
};
const fromEntries = (iterable) => {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};
const populateUrl = (path, params, route) => {
  const overloads = {};
  Object.entries(params).forEach(([param, value]) => {
    const RE = new RegExp(`\\[${param}\\]|\\:${param}`);
    if (path.match(RE))
      path = path.replace(`[${param}]`, encodeURI(value));
    else
      overloads[param] = value;
  });
  const query = route.router.queryHandler.stringify(overloads, route);
  return path + query;
};
const urlFromAddress = () => (({ pathname, search, hash }) => pathname + search + hash)(window.location);
const contexts = {
  get router() {
    return getContext("routify-fragment-context").route.router;
  },
  get fragment() {
    return getContext("routify-fragment-context");
  }
};
const getContextMaybe = (name) => {
  try {
    return getContext(name);
  } catch (err) {
  }
};
const getable = (value, start) => {
  const store = writable(value, start);
  return Object.assign(store, { get: () => get_store_value(store) });
};
const identicalRoutes = (...routes2) => routes2.map((route) => JSON.stringify([route?.allFragments, route?.url])).reduce((prev, curr) => prev === curr && curr);
const clone = (obj, ...rest) => Object.assign(Object.create(Object.getPrototypeOf(obj)), obj, ...rest);
class BaseReflector {
  constructor(router2) {
    this.router = router2;
    this.log = this.router.log;
  }
  install() {
  }
  uninstall() {
  }
  reflect() {
  }
}
const createBrowserAdapter = (opts) => {
  const delimiter = opts?.delimiter || ";";
  return {
    toRouter: (url, router2) => {
      const formatRE = router2.name ? `${router2.name}=(.+?)` : `(.+?)`;
      const RE = new RegExp(`(^|${delimiter})${formatRE}(${delimiter}|$)`);
      const matches = url.match(RE);
      return matches ? matches[2] : "/";
    },
    toBrowser: (routers) => routers.map((r) => (r.name ? `${r.name}=` : "") + r.url.external()).join(delimiter)
  };
};
class Global {
  constructor() {
    __publicField(this, "instances", []);
    __publicField(this, "browserAdapter", createBrowserAdapter());
    __publicField(this, "urlFromBrowser", (router2) => {
      return this.browserAdapter.toRouter(urlFromAddress(), router2);
    });
    if (typeof window !== "undefined")
      window["__routify"] = this;
  }
  get routers() {
    return [].concat(...this.instances.map((instance) => instance.routers));
  }
  register(instance) {
    this.instances.push(instance);
    return this;
  }
}
const globalInstance = new Global();
const defaultRe = /\[(.+?)\]/gm;
class UrlParamUtils {
  constructor(RE = defaultRe) {
    __publicField(this, "getFieldsFromName", (name) => [...name.matchAll(this.RE)].map((v) => v[1]));
    __publicField(this, "getRegexFromName", (name) => new RegExp("^" + name.replace(this.RE, "(.+)") + "$"));
    __publicField(this, "getValuesFromPath", (re, path) => (path.match(re) || []).slice(1));
    __publicField(this, "mapFieldsWithValues", (fields, values) => this.haveEqualLength(fields, values) && fields.reduce((map, field, index) => {
      map[field] = values[index];
      return map;
    }, {}));
    __publicField(this, "haveEqualLength", (fields, values) => {
      if (fields.length !== values.length)
        throw new Error(`fields and values should be of same length
fields: ${JSON.stringify(fields)}
values: ${JSON.stringify(values)}`);
      return true;
    });
    this.RE = RE;
  }
}
class RNode {
  constructor(name, module, instance) {
    __publicField(this, "instance");
    __publicField(this, "parent");
    __publicField(this, "meta", {});
    __publicField(this, "id");
    this.instance = instance;
    this.name = name;
    instance.nodeIndex.push(this);
    this.module = module;
    Object.defineProperty(this, "Instance", { enumerable: false });
    Object.defineProperty(this, "instance", { enumerable: false });
    Object.defineProperty(this, "parent", { enumerable: false });
  }
  appendChild(child) {
    child.parent = this;
  }
  createChild(name, module) {
    const node = this.instance.createNode(name, module);
    this.appendChild(node);
    return node;
  }
  get descendants() {
    return this.instance.nodeIndex.filter((node) => node.ancestors.find((n) => n === this));
  }
  remove() {
    const { nodeIndex } = this.instance;
    const index = nodeIndex.findIndex((node) => node === this);
    nodeIndex.splice(index, 1);
  }
  get ancestors() {
    let node = this;
    const ancestors = [];
    while (node = node.parent)
      ancestors.push(node);
    return ancestors;
  }
  get root() {
    let node = this;
    while (node.parent)
      node = node.parent;
    return node;
  }
  get isRoot() {
    return this === this.root;
  }
  get children() {
    return this.instance.nodeIndex.filter((node) => node.parent === this);
  }
  get level() {
    return (this.parent?.level || 0) + 1;
  }
  traverse(path) {
    const originNode = path.startsWith("/") ? this.root : this;
    const steps = path.split("/").filter((snip) => snip !== ".").filter(Boolean);
    try {
      const target = steps.reduce((target2, step) => step === ".." ? target2.parent : target2.children.find((node) => node.name === step), originNode);
      return target;
    } catch (err) {
      console.error("can't resolve path", path, "from", this.path, "\n", err);
    }
  }
  toJSON() {
    return {
      ...this,
      children: [...this.children]
    };
  }
  get path() {
    return "/" + [this, ...this.ancestors].reverse().map((node) => node.name).filter(Boolean).join("/");
  }
}
const CTX = "routify-fragment-context";
const Node = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { node } = $$props;
  let { passthrough } = $$props;
  const context = { ...getContext(CTX), node };
  setContext(CTX, context);
  let Component2;
  if (node.module)
    node.getRawComponent().then((r) => Component2 = r);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.passthrough === void 0 && $$bindings.passthrough && passthrough !== void 0)
    $$bindings.passthrough(passthrough);
  return `${node.module ? `${Component2 ? `${validate_component(Component2, "Component").$$render($$result, Object.assign(passthrough, { context }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : ``}` : `${slots.default ? slots.default({}) : ``}`}`;
});
class RNodeRuntime extends RNode {
  constructor() {
    super(...arguments);
    __privateAdd(this, _regex, {});
    __publicField(this, "importTree", (snapshotRoot) => {
      const queue = [[this, snapshotRoot]];
      while (queue.length) {
        const [node, snapshot] = queue.pop();
        const { children, ...nodeSnapshot } = snapshot;
        Object.assign(node, nodeSnapshot);
        for (const childSnapshot of children) {
          const childNode = node.createChild(snapshot.name || snapshot.rootName || "");
          queue.push([childNode, childSnapshot]);
        }
      }
      return this;
    });
  }
  get regex() {
    const { name } = this;
    if (!__privateGet(this, _regex)[name])
      __privateGet(this, _regex)[name] = this.instance.utils.getRegexFromName(this.name);
    return __privateGet(this, _regex)[name];
  }
  set regex(value) {
    __privateGet(this, _regex)[this.name] = new RegExp(value);
  }
  get children() {
    const nodes = this.instance.nodeIndex;
    return nodes.filter((node) => node.parent === this).sort((prev, curr) => (prev.meta.order || 0) - (curr.meta.order || 0));
  }
  get pages() {
    return this.children.filter((node) => node.name !== "index").filter((node) => !node.meta.fallback).filter((node) => !node.name.startsWith("_")).filter((node) => !node.name.includes("[")).filter((node) => !(node.meta?.order === false));
  }
  getRawComponent() {
    return this.module && new Promise((resolve) => {
      const modulePromise = this.module();
      const rawComponent = modulePromise.then ? modulePromise.then((r) => r.default) : modulePromise.default;
      resolve(rawComponent);
    });
  }
  get component() {
    const node = this;
    return function(options) {
      options.props = {
        ...options.props,
        passthrough: options.props,
        node
      };
      return new Node({ ...options });
    };
  }
  appendChild(child) {
    if (child.instance)
      child.parent = this;
  }
  get _fallback() {
    return this.children.find((node) => node.meta.fallback) || this.parent?._fallback;
  }
}
_regex = new WeakMap();
class Routify {
  constructor(options) {
    __publicField(this, "Node", RNode);
    __publicField(this, "mode", "runtime");
    __publicField(this, "nodeIndex", []);
    __publicField(this, "rootNodes", {});
  }
  createNode(name, module) {
    return new this.Node(name, module, this);
  }
}
class RoutifyRuntime extends Routify {
  constructor(options) {
    super();
    __publicField(this, "Node", RNodeRuntime);
    __publicField(this, "mode", "runtime");
    __publicField(this, "routers", []);
    __publicField(this, "rootNodes", {});
    this.options = options;
    if (options.routes) {
      this.rootNodes[options.routes.rootName || "unnamed"] = this.createNode(options.routes.rootName).importTree(options.routes);
    }
    this.utils = new UrlParamUtils();
    this.global = globalInstance.register(this);
    Object.defineProperty(this, "routers", { enumerable: false });
    this.log = this.global.log;
  }
}
const createHooksCollection = (runner) => {
  const hooks = [];
  const hooksCollection = (hook) => {
    hooks.push(hook);
    return () => hooks.splice(hooks.indexOf(hook), 1);
  };
  hooksCollection.hooks = hooks;
  hooksCollection.run = runner(hooks);
  return hooksCollection;
};
const createPipelineCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((pipedValue, hook) => pipedValue?.then ? pipedValue.then((r) => hook(r, ...rest)) : hook(pipedValue, ...rest), value));
const createSequenceHooksCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((last, hook) => last?.then ? last.then((_) => hook(value, ...rest)) : hook(value, ...rest), value));
const createGuardsCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((pipedValue, hook) => pipedValue?.then ? pipedValue.then((r) => r && hook(value, ...rest)) : pipedValue && hook(value, ...rest), value || true));
class AddressReflector extends BaseReflector {
  constructor(router2) {
    super(router2);
    __publicField(this, "reflect", () => {
      const { mode } = get_store_value(this.router.activeRoute);
      if (mode === "popState")
        return false;
      const { routers, browserAdapter } = this.router.instance.global;
      const addressRouters = routers.filter((router2) => router2.urlReflector instanceof this.constructor);
      const url = browserAdapter.toBrowser(addressRouters);
      history[`${mode}Native`]({}, "", url);
    });
    const { instance, urlRewrites } = router2;
    const { urlFromBrowser, browserAdapter } = instance.global;
    if (!history["onPushstate"]) {
      polyfillHistory();
    }
    const createStateEventHandler = (method) => {
      return function(data, title, url) {
        const routerName = data?.routify?.router ?? false;
        if (routerName === false)
          url = browserAdapter.toRouter(url, router2);
        else if (routerName !== router2.name)
          return false;
        for (const rewrite of urlRewrites)
          url = rewrite.toInternal(url, { router: router2 });
        router2.url[method](url);
      };
    };
    this.absorb = () => router2.url.replace(urlFromBrowser(router2));
    this._pushstateHandler = createStateEventHandler("push");
    this._replacestateHandler = createStateEventHandler("replace");
    this._popstateHandler = () => router2.url.pop(urlFromBrowser(router2));
  }
  install() {
    this.hooks = [
      history["onPushstate"](this._pushstateHandler),
      history["onReplacestate"](this._replacestateHandler),
      history["onPopstate"](this._popstateHandler)
    ];
    if (!get_store_value(this.router.activeRoute))
      this.absorb();
    else
      this.reflect();
  }
  uninstall() {
    this.hooks.forEach((unreg) => unreg());
    setTimeout(() => this.reflect());
  }
}
function polyfillHistory() {
  const hooks = {
    onPushstate: createSequenceHooksCollection(),
    onReplacestate: createSequenceHooksCollection(),
    onPopstate: createSequenceHooksCollection()
  };
  Object.assign(history, hooks);
  const { pushState, replaceState } = history;
  history["pushStateNative"] = pushState;
  history["replaceStateNative"] = replaceState;
  history.pushState = hooks.onPushstate.run;
  history.replaceState = hooks.onReplacestate.run;
  window.addEventListener("popstate", hooks.onPopstate.run);
  return true;
}
class InternalReflector extends BaseReflector {
}
const Noop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { context = null } = $$props;
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  return `${slots.default ? slots.default({}) : ``}`;
});
const { Object: Object_1 } = globals;
const Component = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fragment;
  let restFragments;
  let node;
  let load2;
  let route;
  let { fragments } = $$props;
  let { decorator = null } = $$props;
  let { props = {} } = $$props;
  let context = {};
  setContext("routify-fragment-context", context);
  if ($$props.fragments === void 0 && $$bindings.fragments && fragments !== void 0)
    $$bindings.fragments(fragments);
  if ($$props.decorator === void 0 && $$bindings.decorator && decorator !== void 0)
    $$bindings.decorator(decorator);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  [fragment, ...restFragments] = [...fragments];
  ({ node, load: load2, route } = fragment);
  context = Object.assign(context, { route, node, load: load2, fragment });
  return `${validate_component(decorator || Noop || missing_component, "svelte:component").$$render($$result, { context }, {}, {
    default: () => {
      return `${validate_component(fragment.node.module().default || missing_component, "svelte:component").$$render($$result, Object_1.assign({ context }, props, load2?.props), {}, {
        default: ({ props: props2, decorator: decorator2 }) => {
          return `${restFragments.length ? `${validate_component(Component, "svelte:self").$$render($$result, {
            fragments: restFragments,
            props: props2,
            decorator: decorator2
          }, {}, {})}` : ``}`;
        }
      })}`;
    }
  })}`;
});
const sleep = () => new Promise(requestAnimationFrame);
const scrollIsIdle = (timeout = 100) => new Promise((resolve) => {
  let scrollTimeout;
  const listener = async (e) => {
    clearTimeout(scrollTimeout);
    await sleep();
    scrollTimeout = setTimeout(() => {
      resolve();
      removeEventListener("scroll", listener);
    }, timeout);
  };
  addEventListener("scroll", listener);
});
const isParentToARouter = (elem) => globalInstance.routers.find((router2) => router2.parentElem === elem);
const createScrollHandler = () => {
  const isScrolling = writable(false);
  const run = ({ route, history: history2, ...rest }) => {
    const [path, hash] = route.url.split("#");
    const [prevPath, _prevHash] = history2[0]?.url.split("#") || [];
    const softScroll = async (shouldObserve) => {
      const samePath = path === prevPath;
      const elem = document.getElementById(hash);
      if (elem)
        elem.scrollIntoView({ behavior: samePath ? "smooth" : "auto" });
      if (samePath && elem) {
        isScrolling.set(true);
        await scrollIsIdle();
        isScrolling.set(false);
      }
      if (!samePath && shouldObserve) {
        const observer = new MutationObserver(() => softScroll());
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true
        });
        setTimeout(observer.disconnect.bind(observer), 500);
      }
    };
    const resetScroll = (element) => {
      if (element) {
        element.scrollTop = 0;
        const parent = element.parentElement;
        if (parent && parent.scrollTo && parent?.dataset["routify-scroll"] !== "lock" && !isParentToARouter(parent))
          resetScroll(element.parentElement);
      }
    };
    if (hash)
      softScroll(true);
    else
      resetScroll(route.router.parentElem);
  };
  return { isScrolling, run };
};
const plugin = {
  beforeRouterInit: ({ router: router2 }) => {
    const { isScrolling, run } = createScrollHandler();
    router2.afterUrlChange(run);
    router2["scrollHandler"] = { isScrolling };
  }
};
var reset = () => ({
  beforeUrlChange: ({ route }) => {
    const fragments = route.allFragments;
    fragments.forEach((fragment) => {
      const { reset: reset2 } = fragment.node.meta;
      if (reset2) {
        const index = fragments.indexOf(fragment);
        const deleteCount = reset2 === true ? index : Number(reset2);
        const start = index - deleteCount;
        fragments.splice(start, index);
      }
    });
    return true;
  }
});
const stripNullFields = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
const normalizeRouterOptions = (options, config) => {
  config = config || {
    name: "",
    beforeRouterInit: [],
    afterRouterInit: [],
    urlRewrite: [],
    beforeUrlChange: [],
    afterUrlChange: [],
    transformFragments: [],
    onDestroy: []
  };
  const { plugins, ...optionsOnly } = options;
  const optionsGroups = [...plugins || [], optionsOnly];
  optionsGroups.forEach((pluginOptions) => {
    if ("plugin" in pluginOptions)
      normalizeRouterOptions(pluginOptions, config);
    Object.entries(pluginOptions).forEach(([field, value]) => {
      if (Array.isArray(config[field]))
        config[field].push(...[value].flat().filter(Boolean));
      else
        config[field] = value || config[field];
    });
  });
  return config;
};
const defaultPlugins = [plugin, reset()];
const _Router = class {
  constructor(input) {
    __publicField(this, "pendingRoute", getable(null));
    __publicField(this, "activeRoute", getable(null));
    __privateAdd(this, _urlReflector, null);
    __publicField(this, "urlRewrites", []);
    __publicField(this, "beforeRouterInit", createSequenceHooksCollection());
    __publicField(this, "afterRouterInit", createSequenceHooksCollection());
    __publicField(this, "beforeUrlChange", createGuardsCollection());
    __publicField(this, "afterUrlChange", createSequenceHooksCollection());
    __publicField(this, "transformFragments", createPipelineCollection());
    __publicField(this, "onDestroy", createSequenceHooksCollection());
    __publicField(this, "parentElem", null);
    __publicField(this, "queryHandler", {
      parse: (search, route) => fromEntries(new URLSearchParams(search)),
      stringify: (params, route) => {
        const query = new URLSearchParams(params).toString();
        return query ? `?${query}` : "";
      }
    });
    __publicField(this, "url", {
      internal: () => this.url.getPending() || this.url.getActive(),
      external: () => this.getExternalUrl(),
      getActive: () => get_store_value(this.activeRoute)?.url,
      getPending: () => get_store_value(this.pendingRoute)?.url,
      toString: () => this.url.internal(),
      set: this._setUrl,
      push: (url) => this._setUrl(url, "pushState"),
      replace: (url) => this._setUrl(url, "replaceState"),
      pop: (url) => this._setUrl(url, "popState")
    });
    __publicField(this, "ready", (() => new Promise((resolve) => {
      let unsub;
      unsub = this.activeRoute.subscribe((route) => {
        if (route)
          resolve();
        if (unsub)
          unsub();
      });
    }))());
    __publicField(this, "history", []);
    __publicField(this, "setParentElem", (elem) => this.parentElem = elem.parentElement);
    __publicField(this, "getExternalUrl", (url) => {
      const result = this.urlRewrites.reduce((_url, rewrite) => rewrite.toExternal(_url, { router: this }), url || this.url.internal());
      return result;
    });
    __publicField(this, "getInternalUrl", (url) => this.urlRewrites.reduce((_url, rewrite) => rewrite.toInternal(_url, { router: this }), url));
    const { subscribe: subscribe2, set } = writable(this);
    this.subscribe = subscribe2;
    this.triggerStore = () => set(this);
    input.plugins = [...input.plugins || [], ...defaultPlugins].filter(Boolean);
    this.init(input);
    this.params = derived(this.activeRoute, ($activeRoute) => $activeRoute.params);
    this.afterUrlChange(() => setTimeout(() => __privateGet(this, _urlReflector).reflect()));
    this.activeRoute.get = () => get_store_value(this.activeRoute);
    this.pendingRoute.get = () => get_store_value(this.pendingRoute);
  }
  init(input) {
    const firstInit = !this.options;
    input = stripNullFields(input);
    this.options = normalizeRouterOptions({ ...this.options, ...input });
    let {
      instance,
      rootNode,
      name,
      routes: routes2,
      urlRewrite,
      urlReflector,
      url,
      passthrough,
      beforeUrlChange,
      afterUrlChange,
      transformFragments,
      onDestroy: onDestroy2,
      beforeRouterInit,
      afterRouterInit,
      queryHandler
    } = this.options;
    if (queryHandler)
      this.queryHandler = queryHandler;
    beforeUrlChange.forEach(this.beforeUrlChange);
    transformFragments.forEach(this.transformFragments);
    afterUrlChange.forEach(this.afterUrlChange);
    onDestroy2.forEach(this.onDestroy);
    beforeRouterInit.forEach(this.beforeRouterInit);
    afterRouterInit.forEach(this.afterRouterInit);
    this.beforeRouterInit.run({ router: this, firstInit });
    const parentCmpCtx = getContextMaybe("routify-fragment-context");
    this.instance = instance || this.instance || parentCmpCtx?.route.router.instance || globalInstance.instances[0] || new RoutifyRuntime({});
    this.name = name;
    this.urlRewrites = urlRewrite;
    if (passthrough && !(passthrough instanceof _Router))
      passthrough = parentCmpCtx?.route.router || passthrough;
    this.passthrough = passthrough || this.passthrough;
    globalInstance.instances.forEach((inst) => {
      const index = inst.routers.indexOf(this);
      if (index !== -1)
        inst.routers.splice(index, 1);
    });
    this.instance.routers.push(this);
    if (routes2)
      this.importRoutes(routes2);
    this.parentCmpCtx = parentCmpCtx;
    this.rootNode = rootNode || this.rootNode || this.instance.rootNodes.default;
    if (this.url.getActive()) {
      this._setUrl(this.url.getActive(), "pushState", true);
    }
    const shouldInstallUrlReflector = !this.urlReflector || urlReflector && !(this.urlReflector instanceof urlReflector);
    if (shouldInstallUrlReflector) {
      urlReflector = urlReflector || (typeof window != "undefined" ? AddressReflector : InternalReflector);
      this.setUrlReflector(urlReflector);
    }
    if (url)
      this.url.replace(url);
    this.triggerStore();
    this.afterRouterInit.run({ router: this, firstInit });
  }
  importRoutes(routes2) {
    this.rootNode = this.instance.createNode().importTree(routes2);
    this.instance.rootNodes[routes2.rootName || "unnamed"] = this.rootNode;
  }
  async _setUrl(url, mode, isInternal) {
    if (!isInternal)
      url = this.getInternalUrl(url);
    url = url || "/";
    url = url.replace(/(.+)\/+([#?]|$)/, "$1$2");
    const { activeRoute, pendingRoute } = this;
    activeRoute.get();
    if (!url.startsWith("/"))
      url = url.replace(new URL(url).origin, "");
    const route = new Route(this, url, mode);
    const currentRoute = pendingRoute.get() || activeRoute.get();
    if (identicalRoutes(currentRoute, route)) {
      return true;
    }
    pendingRoute.set(route);
    await route.loadRoute();
    return true;
  }
  destroy() {
    this.instance.routers = this.instance.routers.filter((router2) => router2 !== this);
    this.onDestroy.run({ router: this });
  }
  get urlReflector() {
    return __privateGet(this, _urlReflector);
  }
  setUrlReflector(UrlReflector) {
    __privateGet(this, _urlReflector)?.uninstall();
    __privateSet(this, _urlReflector, new UrlReflector(this));
    __privateGet(this, _urlReflector).install();
    this.triggerStore();
  }
};
let Router = _Router;
_urlReflector = new WeakMap();
const createRouter = (options) => new Router(options);
const Router_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeRoute;
  let fragments;
  let $activeRoute, $$unsubscribe_activeRoute = noop, $$subscribe_activeRoute = () => ($$unsubscribe_activeRoute(), $$unsubscribe_activeRoute = subscribe(activeRoute, ($$value) => $activeRoute = $$value), activeRoute);
  let { router: router2 = null } = $$props;
  let { routes: routes2 = null } = $$props;
  let { decorator = null } = $$props;
  let { urlReflector = null } = $$props;
  let { instance = null } = $$props;
  let { urlRewrite = null } = $$props;
  let { url = null } = $$props;
  let { name = null } = $$props;
  let { rootNode = null } = $$props;
  let { passthrough = null } = $$props;
  let { beforeRouterInit = null } = $$props;
  let { afterRouterInit = null } = $$props;
  let { beforeUrlChange = null } = $$props;
  let { afterUrlChange = null } = $$props;
  let { transformFragments = null } = $$props;
  let { onDestroy: onDestroy$1 = null } = $$props;
  let { plugins = null } = $$props;
  let { queryHandler = null } = $$props;
  if (typeof window !== "undefined")
    onDestroy(() => router2.destroy());
  if ($$props.router === void 0 && $$bindings.router && router2 !== void 0)
    $$bindings.router(router2);
  if ($$props.routes === void 0 && $$bindings.routes && routes2 !== void 0)
    $$bindings.routes(routes2);
  if ($$props.decorator === void 0 && $$bindings.decorator && decorator !== void 0)
    $$bindings.decorator(decorator);
  if ($$props.urlReflector === void 0 && $$bindings.urlReflector && urlReflector !== void 0)
    $$bindings.urlReflector(urlReflector);
  if ($$props.instance === void 0 && $$bindings.instance && instance !== void 0)
    $$bindings.instance(instance);
  if ($$props.urlRewrite === void 0 && $$bindings.urlRewrite && urlRewrite !== void 0)
    $$bindings.urlRewrite(urlRewrite);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.rootNode === void 0 && $$bindings.rootNode && rootNode !== void 0)
    $$bindings.rootNode(rootNode);
  if ($$props.passthrough === void 0 && $$bindings.passthrough && passthrough !== void 0)
    $$bindings.passthrough(passthrough);
  if ($$props.beforeRouterInit === void 0 && $$bindings.beforeRouterInit && beforeRouterInit !== void 0)
    $$bindings.beforeRouterInit(beforeRouterInit);
  if ($$props.afterRouterInit === void 0 && $$bindings.afterRouterInit && afterRouterInit !== void 0)
    $$bindings.afterRouterInit(afterRouterInit);
  if ($$props.beforeUrlChange === void 0 && $$bindings.beforeUrlChange && beforeUrlChange !== void 0)
    $$bindings.beforeUrlChange(beforeUrlChange);
  if ($$props.afterUrlChange === void 0 && $$bindings.afterUrlChange && afterUrlChange !== void 0)
    $$bindings.afterUrlChange(afterUrlChange);
  if ($$props.transformFragments === void 0 && $$bindings.transformFragments && transformFragments !== void 0)
    $$bindings.transformFragments(transformFragments);
  if ($$props.onDestroy === void 0 && $$bindings.onDestroy && onDestroy$1 !== void 0)
    $$bindings.onDestroy(onDestroy$1);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.queryHandler === void 0 && $$bindings.queryHandler && queryHandler !== void 0)
    $$bindings.queryHandler(queryHandler);
  {
    {
      const options = {
        instance,
        rootNode,
        name,
        routes: routes2,
        urlRewrite,
        urlReflector,
        passthrough,
        beforeRouterInit,
        afterRouterInit,
        beforeUrlChange,
        afterUrlChange,
        transformFragments,
        onDestroy: onDestroy$1,
        plugins,
        queryHandler
      };
      if (!router2)
        router2 = new Router(options);
      else
        router2.init(options);
    }
  }
  {
    if (url && url !== router2.url.internal())
      router2.url.replace(url);
  }
  $$subscribe_activeRoute(activeRoute = router2.activeRoute);
  fragments = $activeRoute?.fragments || [];
  $$unsubscribe_activeRoute();
  return `${$activeRoute ? `<div style="${"display: contents"}">${validate_component(Component, "Component").$$render($$result, { fragments, decorator }, {}, {})}</div>` : ``}

${!router2.parentElem ? `<div></div>` : ``}`;
});
const router = createRouter({ routes });
const load = ({ page }) => router.url.replace(page.path);
const U5B_indexu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Router_1, "Router").$$render($$result, { router }, {}, {})}`;
});
export { Component as C, InternalReflector as I, Router_1 as R, U5B_indexu5D as U, clone as a, contexts as b, createRouter as c, derived as d, pathAndParamsToUrl as e, load as l, populateUrl as p };
