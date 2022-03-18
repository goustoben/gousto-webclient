# CodeArtifact Troubleshooting

Can't run `yarn install`?

Try the following steps, and after each you may run `echo $CODEARTIFACT_AUTH_TOKEN` to validate whether authentication has been successful.

Before troubleshooting, **please ensure your `ca-authenticate` function is up to date** - (see [README.md](../readme.md#first-run))

## No permissions for CodeArtifact AWS account

Some users have reported that they are unable to authenticate to the EngineerCodeArtifact account when running `aws configure sso`

**Solution**: raise a ticket with Potatoes via #platform-support

## Expired SSO

Your access to AWS via SSO expires in 6 hours - upon running `ca-authenticate` you may experience an error such as:

```
The SSO session associated with this profile has expired or is otherwise invalid. To refresh this SSO session run aws sso login with the corresponding profile.
```

**Solution**: log in again as per below:

```
aws sso login --profile EngineerCodeArtifact-472493421475
```

```
ca-authenticate
```

## Legacy credentials

Some users may have configured their AWS CLI manually prior to the OKTA SSO integration. The presence of expired (non-SSO) credentials may interfere with our OKTA AWS integration.

You can view your existing credentials in `~/.aws/credentials`. If you have any credentials listed for the `EngineerCodeArtifact-472493421475` account, please see the solution below

**Solution**: remove credentials config related to `EngineerCodeArtifact-472493421475` in `~/.aws/credentials`

## Hard-coded credentials

Some users have AWS credentials hard-coded on their local machine, which will interfere with our SSO configuration i.e.:

```
# ~/.zshrc or ~/.bashrc

export CODEARTIFACT_AUTH_TOKEN=some-hard-coded-token
```

**Solution**: remove hard-coded AWS credentials from `~/.zshrc` and `~/.bashrc`

## `ca-authenticate` function is not working as intended

**Solution 1**: ensure your `ca-authenticate` function is up to date (see [README.md](../readme.md#first-run)), run `source ~/.zshrc` (or `~/.bashrc` if you're using bash), then run `ca-authenticate`

**Solution 2**: Some users may still have issues with `ca-authenticate` due to OSX/zsh versioning issues. In this case, you may manually export the `CODEARTIFACT_AUTH_TOKEN` as per below:

```
export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain gousto --domain-owner 472493421475 --query authorizationToken --output text --profile EngineerCodeArtifact-472493421475)
```
