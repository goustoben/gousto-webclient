# Set identity
git config --global user.email "tech@gousto.co.uk"
git config --global user.name "Gousto Tech"

# Read latest version
PACKAGE_VERSION=$(node -p "require('./package.json').version")

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "$CURRENT_BRANCH"

# If branch is master, tag with package.json version
# If not, use current branch name
if [ "$CURRENT_BRANCH" = "master" ]; then TAG_VERSION="$PACKAGE_VERSION"; else TAG_VERSION="$CURRENT_BRANCH-canary"; fi

if [ -n "$TAG_VERSION"  ]; then
  # create temp branch
  CURRENT_TIME=$(date "+%Y.%m.%d-%H.%M.%S")
  git checkout -b $CURRENT_TIME

  # this is needed for the dist to come through when imported in projects
  rm .gitignore
  git add .gitignore

  # build dist version
  npm run build:dist

  # force add new version to git
  git add dist -f
  git commit -m "Add built version of Zest"

  git tag -a $TAG_VERSION -m "Tag new release with tag $TAG_VERSION"
  git push -f origin $TAG_VERSION
else
  echo "Tag version not found."
fi
