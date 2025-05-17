#!/bin/bash

START_DATE="2025-05-17T12:00:00"
CURRENT_DATE=$(date -d "$START_DATE" +%s)

MESSAGES=("Refactor code" "Fix bug" "Add feature" "Improve logic" "Clean up" "Update README")

for file in $(git diff --cached --name-only); do
  DELAY=$((RANDOM % 361 + 240))
  CURRENT_DATE=$((CURRENT_DATE + DELAY))
  FORMATTED_DATE=$(date -d "@$CURRENT_DATE" --iso-8601=seconds)

  RANDOM_MSG=${MESSAGES[$RANDOM % ${#MESSAGES[@]}]}

  GIT_AUTHOR_DATE="$FORMATTED_DATE" \
  GIT_COMMITTER_DATE="$FORMATTED_DATE" \
  git commit -m "$RANDOM_MSG"
done
