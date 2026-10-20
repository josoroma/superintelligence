# Architecture grounding

Use this reference when the image represents a real framework, current documentation, or an example repository. A diagram of a user-supplied conceptual flow does not need unrelated framework research.

## Evidence before layout

- For “latest,” browse the framework's current official documentation. Distinguish installed/repository versions from newer documented defaults; keep the requested target explicit.
- For a repository example, inspect the construction entry point, orchestration, tool registration, persistence, termination, error/retry handling, and observability code relevant to the requested diagram. Pin links to a commit when documenting a concrete implementation.
- Record the checked date, relevant version, source links, and implementation revision in a short accompanying note. The SVG can contain a concise source/date footer and a description of scope; avoid filling cards with citations.
- State whether a feature is built in, enabled by configuration, implemented by the example, or a proposed extension. An available icon or framework capability is not evidence that the application uses it.

## Relationships that often need different treatment

| Relationship | What the image should communicate |
| --- | --- |
| Control flow | Which component invokes the next action and who owns ordering. |
| Tool result | Where outputs, errors, and artifacts return to affect the next decision. |
| Persistence | What reads or writes state; persistence is not automatically another sequential stage. |
| Evaluation | Whether scoring is an application gate, a selected online evaluation, or offline work. |
| Telemetry | Traces, logs, and metrics receive events alongside execution; do not place them in the mandatory loop without evidence. |
| Human review | A gate or interrupt only where the workflow actually requires it. |

Use labels and line patterns as well as color when these distinctions matter. A dashed line or card needs a short legend if its meaning is not obvious.

## Agent loops

For a model/tool architecture, show a model decision, tool execution, result messages returning to the model, and a final-response exit if that matches the implementation. The runtime can own dispatch while the model chooses tools. Parallel calls, subagents, checkpoints, and retries are separate mechanisms; include only those needed to explain the requested system.

“Reason → Plan → Act → Observe → Evaluate → Repeat” is a useful conceptual cycle when requested, not a required runtime sequence. Likewise, Deep Agents is one possible harness, not a default component for every agent diagram. Search, computer use, shell execution, skills, and planning may require explicit configuration; verify the current framework and example before labeling them built in.

For bounded application pipelines, show who owns phase ordering and what ends a run. Attach repair loops to the actual failed gate, state a verified retry limit if known, and show failure outputs or escalation when material. Do not turn “citation IDs validated” into “all claims fact checked.”

## Existing example as a pattern

In the collection, `examples/deep-agent-research.md` illustrates separating a documented framework loop from a pinned application's pipeline and optional integrations. Its checked date and component defaults are historical evidence, not a substitute for new research. Reuse the method, not its exact architecture or claims.
