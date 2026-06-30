# Modules 1 and 2 complete: OAuth 2.0 and OpenID Connect foundations

The learner has progressed through all six foundational lessons (12–17) covering OAuth 2.0 and OpenID Connect from first principles, with interactive quizzes at each step.

**Established knowledge:**
- The delegation problem and why OAuth exists (L12)
- Authorization Code Flow + PKCE step by step, with HTTP parameters (L13)
- All major grant types and when to choose each; confidential vs public clients (L14)
- JWT structure, standard claims, signature verification, and the 6-step validation checklist (L15)
- Why OAuth alone cannot authenticate users; the ID token and OIDC scopes (L16)
- UserInfo endpoint, OIDC discovery document, RP-Initiated Logout (L17)

**Implications for Module 3 (Duende IS Setup):**
- Concepts are solid — lessons can move directly to implementation without re-explaining OAuth/OIDC basics
- Learner knows what a "client registration," "scope," "JWKS endpoint," and "ID token" are, so Duende IS config will map naturally to familiar terms
- Zone of proximal development is now: mapping concepts to real running code (project setup, `AddIdentityServer()`, config objects)
