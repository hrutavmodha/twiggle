# Security Policy for TwiggleJS

## Supported Versions

This document outlines security practices and guidelines for:

| Version | Supported                 |
| ------- | ------------------------- |
| 1.x     | :white_check_mark:        |
| 0.x     | :x: (no longer supported) |

All users are strongly encouraged to use the latest stable release.

---

## Reporting a Vulnerability

If you discover a security vulnerability in this framework, please follow these steps:

1. **Do not create a public issue.**
   Report the issue privately via email: `modhahrutav@gmail.com`.

2. Include the following details:
    - Version of the framework affected
    - Steps to reproduce
    - Browser / environment details
    - Severity assessment (if possible)
    - Any suggested mitigation

3. Our team will respond within **72 hours** and work on a fix or mitigation guidance.

---

## Security Practices

### 1. XSS Protection

- Framework **does not automatically sanitize user input** in `element` rendering.
- Developers must sanitize or escape any untrusted HTML content.
- Avoid using `innerHTML` with unsanitized content.

### 2. DOM Injection

- Avoid exposing APIs that allow arbitrary JavaScript injection from user input.

### 3. Event Handling

- Inline event handlers (`onclick`) are used internally.
- Never pass untrusted scripts into these handlers.

### 4. Third-Party Dependencies

- The framework uses minimal dependencies.
- Keep all dependencies updated and verify their integrity with lock files.

### 5. Content Security Policy (CSP)

- Users are encouraged to enable a strong CSP:
    ```text
    default-src 'self';
    script-src 'self';
    style-src 'self';
    ```
    Prevents inline JS injection or malicious remote scripts.

### 6. Safe State Management

- Framework exposes createState() for reactivity.
- Developers should not bind sensitive data (like auth tokens) directly to DOM elements.
- Sensitive state should be kept in memory and never injected as raw HTML.

---

## Recommended Security Guidelines for Developers

1. Sanitize all user inputs before rendering.
2. Use framework API (createState) instead of manually manipulating DOM or history.
3. Keep dependencies up-to-date and monitor for CVEs.
4. Apply CSP headers in production.
5. Avoid recursive component mounting that can crash or freeze the browser.

---

## Emergency Contact

If you discover a critical vulnerability:

Email: modhahrutav@gmail.com

Response window: within 72 hours

CVE coordination will be done if applicable.

---

## Disclaimer

This framework provides client-side rendering only.
Security largely depends on developer practices (input sanitization, CSP, and state handling).
The maintainers are not responsible for misuse of the framework in unsafe environments.
