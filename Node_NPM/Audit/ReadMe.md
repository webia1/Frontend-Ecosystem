# NPM Audit Examples

    Scan your project for vulnerabilities and automatically install any compatible updates to vulnerable dependencies:
    $ npm audit fix
    
    Run audit fix without modifying node_modules, but still updating the pkglock:
    $ npm audit fix --package-lock-only
    
    Skip updating devDependencies:
    $ npm audit fix --only=prod
    
    Have audit fix install semver-major updates to toplevel dependencies, not just semver-compatible ones:
    $ npm audit fix --force
    
    Do a dry run to get an idea of what audit fix will do, and also output install information in JSON format:
    $ npm audit fix --dry-run --json
    
    Scan your project for vulnerabilities and just show the details, without fixing anything:
    $ npm audit
    
    Get the detailed audit report in JSON format:
    $ npm audit --json
    
    Get the detailed audit report in plain text result, separated by tab characters, allowing for future reuse in scripting or command line post processing, like for example, selecting some of the columns printed:
    $ npm audit --parseable
    
    To parse columns, you can use for example awk, and just print some of them:
    $ npm audit --parseable | awk -F $'\t' '{print $1,$4}'
    
    Fail an audit only if the results include a vulnerability with a level of moderate or higher:
    $ npm audit --audit-level=moderate
