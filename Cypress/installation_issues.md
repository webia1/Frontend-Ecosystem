# Cypress Installation Trouble Shoot

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Corporate Network Certificat Issue](#corporate-network-certificat-issue)
  - [Insecure Methods](#insecure-methods)
  - [Use Corporate Proxy](#use-corporate-proxy)
  - [Add Own Certificates](#add-own-certificates)
  - [Set Environment Variable](#set-environment-variable)

<!-- /code_chunk_output -->

## Corporate Network Certificat Issue

### Insecure Methods

Please be aware of the security risks, especially if we opt for method 1 or 4.

We can instruct npm to ignore SSL certificate checks. **This is insecure and should only be used as a last resort.**

```shell
npm set strict-ssl false
```

### Use Corporate Proxy

If the company uses a proxy server, we need to make sure npm is configured to use it:

```shell
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Add Own Certificates

If our company uses its own certificate, we can add it to npm:

```shell
npm config set cafile "path-to-your-certificate.pem"
```

### Set Environment Variable

We can set the `NODE_TLS_REJECT_UNAUTHORIZED` environment variable to `0`. **This is also insecure.**

```shell
set NODE_TLS_REJECT_UNAUTHORIZED=0
```
