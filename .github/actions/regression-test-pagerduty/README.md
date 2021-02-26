# POC: Regression test PagerDuty action

## The master plan

On CircleCI CI job, store regression test results as an artifact

On CircleCI webhook firing on completion of 'ci' job:
    - Retrieve regression test results
    - If pass, do nothing
    - If fail:
        - Check whether there are successive test fails
        - If no, do nothing

        - If yes:
            - Get codeowner (for test file? Or by other means, maybe owner of last commit to develop as fallback)
            - Raise pagerduty p2 incident assigned to owner
