# Debugging TypeScript within VSCode

## launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "TypeScript Debugging",
      "type": "node",
      "request": "launch",
      "args": ["${relativeFile}"],
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "/opt/homebrew/bin/ts-node"
    }
  ]
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["ESNext", "DOM"],
    "module": "esnext",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "sourceMap": true
  }
}
```
