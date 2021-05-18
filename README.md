#WHS - We Hate Streaming

Rebase från main till annan branch:

1. git checkout main
2. git pull
3. git checkout din-branch
4. git rebase main
5. *Löser en konflikt*
6. git add .                          |
|  git commit -m 'rebased from main'  | Behövs göra efter varje konflikt  
7. git rebase --continue
8. git push --force
