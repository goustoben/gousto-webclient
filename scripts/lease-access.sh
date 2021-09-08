#!/bin/bash

now=$(date +"%T")
echo "Leasing access to environments at: $now"

AWS_ACCESS_KEY_ID=$BETA_AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$BETA_AWS_SECRET_ACCESS_KEY \

export public_ip_address=$(wget -qO- http://checkip.amazonaws.com)

ipsetDetails=$(aws wafv2 list-ip-sets --scope REGIONAL | jq -c '.IPSets[] | select( .Name | contains(env.ENVIRONMENT + "-public-ipset-IPWhitelist"))')
ipsetName=$(echo $ipsetDetails | jq -cj '.Name')
ipsetId=$(echo $ipsetDetails | jq -cj '.Id')
ipsetScope="REGIONAL"
ipsetLockToken=$(echo $ipsetDetails | jq -cj '.LockToken')

ipset=$(aws wafv2 get-ip-set --name `echo $ipsetName` --scope `echo $ipsetScope` --id `echo $ipsetId`)
ipsetAddresses=$(echo $ipset | jq -c '.IPSet.Addresses')
modifiedAddresses=$(echo $ipsetAddresses | jq -c '. + [env.public_ip_address + "/32"]')
nextLockTokenRaw=$(aws wafv2 update-ip-set --name $ipsetName --scope $ipsetScope --id $ipsetId --lock-token $ipsetLockToken --addresses $modifiedAddresses)
nextLockToken=$(echo $nextLockTokenRaw | jq -cj '.NextLockToken')
echo "export ipsetName=$ipsetName" >> $BASH_ENV
echo "export ipsetScope=$ipsetScope" >> $BASH_ENV
echo "export ipsetId=$ipsetId" >> $BASH_ENV
echo "export nextLockToken=$nextLockToken" >> $BASH_ENV
echo "export ipsetAddresses='$ipsetAddresses'" >> $BASH_ENV

echo "Adding 120s sleep due to WAF update time :-("
sleep 120

later=$(date +"%T")
echo "Finished leasing access at: $later"
