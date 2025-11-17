# ✨ Module 5 References: Architecture and Configuration Management in Docker and Kubernetes


References:

- [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Configuration Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)

---

### Tips


_**Kubernetes Secret Storage Behavior & Best Practices**_

By default, Kubernetes stores Secrets in etcd encoded in base64, not encrypted. Base64 is not encryption, it’s just an encoding, so anyone with access to etcd or the API server can decode them easily.

**Important points:**

1. Default behavior
	- Secrets are stored in etcd as base64 strings under the Secret object.
	- Anyone with access to etcd or the Kubernetes API (with sufficient permissions) can read them.
2. Encryption at rest
	- Kubernetes supports encryption at rest for Secrets.
	- You can enable this by configuring the EncryptionConfiguration in the API server (--encryption-provider-config).
	- Supported providers include aesgcm, kms, secretbox, etc.
3. Best practices
	- Use RBAC to restrict access to Secrets.
	- Enable etcd encryption at rest in production.
	- Avoid putting Secrets in YAML files under version control unless encrypted (e.g., using SealedSecrets or SOPS).
