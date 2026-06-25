# Authorization failure debugging process taught

Taught a structured five-cause taxonomy (provider exception, name mismatch, missing mapping, stale cache, wrong key string) and a decision tree for diagnosing Deny results. Three interactive case studies: provider exception (sudden mass loss of access), name mismatch (never worked for new AD group), and stale cache (change not taking effect). SQL diagnostic toolkit: checking providers, ExternalRole names, mappings, and running the SP manually.

Key non-obvious insight: if the SP produces the expected key but the user still gets Deny, the cache is stale — not a data problem. The SP is the ground truth; the cache is the live truth.

**Implications:** User now has a repeatable debugging process grounded in the real diagnostic tools (SQL + API endpoints + logs). Final mission goal remaining: caching strategy in depth — Redis TTL, circuit breaker configuration, consistency guarantees. This is Lesson 06.
