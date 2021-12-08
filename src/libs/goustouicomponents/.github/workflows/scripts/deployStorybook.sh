# Set identity
git config --global user.email "tech@gousto.co.uk"
git config --global user.name "Gousto Tech"

# Go to latest release
git checkout master
git reset --hard origin/master

# Read latest version
PACKAGE_VERSION=$(node -p "require('./package.json').version")

if [ -n "$PACKAGE_VERSION" ]; then
  # build new static version
  npm run build-storybook -- -o $PACKAGE_VERSION

  # copy file that updates storybook config file to root so it stays available when switching branches
  cp .github/workflows/scripts/updateStorybookConfig.js .

  # move to the branch holding the static builds
  git fetch
  git checkout gh-pages

  # clean existing version
  TEMP_DIRECTORY=keeptemp
  mkdir $TEMP_DIRECTORY
  mv .gitignore updateStorybookConfig.js storybook-config.json CHANGELOG.md $TEMP_DIRECTORY/
  find . -maxdepth 1 -type f -delete
  rm -rf images sb_dll static
  mv $TEMP_DIRECTORY/* $TEMP_DIRECTORY/.gitignore .
  rm -r $TEMP_DIRECTORY

  # copy build to root as well
  cp -R $PACKAGE_VERSION/. .

  # add latest version to storybook-config.json
  node updateStorybookConfig.js PACKAGE_VERSION=$PACKAGE_VERSION

  # cleanup
  rm updateStorybookConfig.js

  # register new changes
  git add .
  git commit -m "Add build $PACKAGE_VERSION"
  git push

else
  echo "Package version not found."
fi
