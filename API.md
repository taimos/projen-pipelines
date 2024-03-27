# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BashCDKPipeline <a name="BashCDKPipeline" id="projen-pipelines.BashCDKPipeline"></a>

#### Initializers <a name="Initializers" id="projen-pipelines.BashCDKPipeline.Initializer"></a>

```typescript
import { BashCDKPipeline } from 'projen-pipelines'

new BashCDKPipeline(app: AwsCdkTypeScriptApp, options: BashCDKPipelineOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.BashCDKPipeline.Initializer.parameter.app">app</a></code> | <code>projen.awscdk.AwsCdkTypeScriptApp</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipeline.Initializer.parameter.options">options</a></code> | <code><a href="#projen-pipelines.BashCDKPipelineOptions">BashCDKPipelineOptions</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="projen-pipelines.BashCDKPipeline.Initializer.parameter.app"></a>

- *Type:* projen.awscdk.AwsCdkTypeScriptApp

---

##### `options`<sup>Required</sup> <a name="options" id="projen-pipelines.BashCDKPipeline.Initializer.parameter.options"></a>

- *Type:* <a href="#projen-pipelines.BashCDKPipelineOptions">BashCDKPipelineOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.BashCDKPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen-pipelines.BashCDKPipeline.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen-pipelines.BashCDKPipeline.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen-pipelines.BashCDKPipeline.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen-pipelines.BashCDKPipeline.engineType">engineType</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="projen-pipelines.BashCDKPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen-pipelines.BashCDKPipeline.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen-pipelines.BashCDKPipeline.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen-pipelines.BashCDKPipeline.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `engineType` <a name="engineType" id="projen-pipelines.BashCDKPipeline.engineType"></a>

```typescript
public engineType(): PipelineEngine
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.BashCDKPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen-pipelines.BashCDKPipeline.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen-pipelines.BashCDKPipeline.isConstruct"></a>

```typescript
import { BashCDKPipeline } from 'projen-pipelines'

BashCDKPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.BashCDKPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen-pipelines.BashCDKPipeline.isComponent"></a>

```typescript
import { BashCDKPipeline } from 'projen-pipelines'

BashCDKPipeline.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.BashCDKPipeline.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.BashCDKPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen-pipelines.BashCDKPipeline.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipeline.property.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipeline.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen-pipelines.BashCDKPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen-pipelines.BashCDKPipeline.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="projen-pipelines.BashCDKPipeline.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

---

##### `stackPrefix`<sup>Required</sup> <a name="stackPrefix" id="projen-pipelines.BashCDKPipeline.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string

---


### CDKPipeline <a name="CDKPipeline" id="projen-pipelines.CDKPipeline"></a>

The CDKPipeline class extends the Component class and sets up the necessary configuration for deploying AWS CDK (Cloud Development Kit) applications across multiple stages.

It also manages tasks such as publishing CDK assets, bumping version based on git tags, and cleaning up conflicting tasks.

#### Initializers <a name="Initializers" id="projen-pipelines.CDKPipeline.Initializer"></a>

```typescript
import { CDKPipeline } from 'projen-pipelines'

new CDKPipeline(app: AwsCdkTypeScriptApp, baseOptions: CDKPipelineOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.CDKPipeline.Initializer.parameter.app">app</a></code> | <code>projen.awscdk.AwsCdkTypeScriptApp</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipeline.Initializer.parameter.baseOptions">baseOptions</a></code> | <code><a href="#projen-pipelines.CDKPipelineOptions">CDKPipelineOptions</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="projen-pipelines.CDKPipeline.Initializer.parameter.app"></a>

- *Type:* projen.awscdk.AwsCdkTypeScriptApp

---

##### `baseOptions`<sup>Required</sup> <a name="baseOptions" id="projen-pipelines.CDKPipeline.Initializer.parameter.baseOptions"></a>

- *Type:* <a href="#projen-pipelines.CDKPipelineOptions">CDKPipelineOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.CDKPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen-pipelines.CDKPipeline.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen-pipelines.CDKPipeline.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen-pipelines.CDKPipeline.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen-pipelines.CDKPipeline.engineType">engineType</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="projen-pipelines.CDKPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen-pipelines.CDKPipeline.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen-pipelines.CDKPipeline.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen-pipelines.CDKPipeline.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `engineType` <a name="engineType" id="projen-pipelines.CDKPipeline.engineType"></a>

```typescript
public engineType(): PipelineEngine
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.CDKPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen-pipelines.CDKPipeline.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen-pipelines.CDKPipeline.isConstruct"></a>

```typescript
import { CDKPipeline } from 'projen-pipelines'

CDKPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.CDKPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen-pipelines.CDKPipeline.isComponent"></a>

```typescript
import { CDKPipeline } from 'projen-pipelines'

CDKPipeline.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.CDKPipeline.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.CDKPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen-pipelines.CDKPipeline.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipeline.property.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipeline.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen-pipelines.CDKPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen-pipelines.CDKPipeline.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="projen-pipelines.CDKPipeline.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

---

##### `stackPrefix`<sup>Required</sup> <a name="stackPrefix" id="projen-pipelines.CDKPipeline.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string

---


### GithubCDKPipeline <a name="GithubCDKPipeline" id="projen-pipelines.GithubCDKPipeline"></a>

#### Initializers <a name="Initializers" id="projen-pipelines.GithubCDKPipeline.Initializer"></a>

```typescript
import { GithubCDKPipeline } from 'projen-pipelines'

new GithubCDKPipeline(app: AwsCdkTypeScriptApp, options: GithubCDKPipelineOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GithubCDKPipeline.Initializer.parameter.app">app</a></code> | <code>projen.awscdk.AwsCdkTypeScriptApp</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipeline.Initializer.parameter.options">options</a></code> | <code><a href="#projen-pipelines.GithubCDKPipelineOptions">GithubCDKPipelineOptions</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="projen-pipelines.GithubCDKPipeline.Initializer.parameter.app"></a>

- *Type:* projen.awscdk.AwsCdkTypeScriptApp

---

##### `options`<sup>Required</sup> <a name="options" id="projen-pipelines.GithubCDKPipeline.Initializer.parameter.options"></a>

- *Type:* <a href="#projen-pipelines.GithubCDKPipelineOptions">GithubCDKPipelineOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.GithubCDKPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen-pipelines.GithubCDKPipeline.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen-pipelines.GithubCDKPipeline.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen-pipelines.GithubCDKPipeline.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen-pipelines.GithubCDKPipeline.engineType">engineType</a></code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipeline.createAssetUpload">createAssetUpload</a></code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipeline.createDeployment">createDeployment</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="projen-pipelines.GithubCDKPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen-pipelines.GithubCDKPipeline.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen-pipelines.GithubCDKPipeline.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen-pipelines.GithubCDKPipeline.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `engineType` <a name="engineType" id="projen-pipelines.GithubCDKPipeline.engineType"></a>

```typescript
public engineType(): PipelineEngine
```

##### `createAssetUpload` <a name="createAssetUpload" id="projen-pipelines.GithubCDKPipeline.createAssetUpload"></a>

```typescript
public createAssetUpload(): void
```

##### `createDeployment` <a name="createDeployment" id="projen-pipelines.GithubCDKPipeline.createDeployment"></a>

```typescript
public createDeployment(stage: DeploymentStage): void
```

###### `stage`<sup>Required</sup> <a name="stage" id="projen-pipelines.GithubCDKPipeline.createDeployment.parameter.stage"></a>

- *Type:* <a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.GithubCDKPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen-pipelines.GithubCDKPipeline.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen-pipelines.GithubCDKPipeline.isConstruct"></a>

```typescript
import { GithubCDKPipeline } from 'projen-pipelines'

GithubCDKPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.GithubCDKPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen-pipelines.GithubCDKPipeline.isComponent"></a>

```typescript
import { GithubCDKPipeline } from 'projen-pipelines'

GithubCDKPipeline.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.GithubCDKPipeline.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GithubCDKPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen-pipelines.GithubCDKPipeline.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipeline.property.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipeline.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipeline.property.needsVersionedArtifacts">needsVersionedArtifacts</a></code> | <code>boolean</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="projen-pipelines.GithubCDKPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen-pipelines.GithubCDKPipeline.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="projen-pipelines.GithubCDKPipeline.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

---

##### `stackPrefix`<sup>Required</sup> <a name="stackPrefix" id="projen-pipelines.GithubCDKPipeline.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string

---

##### `needsVersionedArtifacts`<sup>Required</sup> <a name="needsVersionedArtifacts" id="projen-pipelines.GithubCDKPipeline.property.needsVersionedArtifacts"></a>

```typescript
public readonly needsVersionedArtifacts: boolean;
```

- *Type:* boolean

---


### GitlabCDKPipeline <a name="GitlabCDKPipeline" id="projen-pipelines.GitlabCDKPipeline"></a>

The GitlabCDKPipeline class extends CDKPipeline to provide a way to configure and execute AWS CDK deployment pipelines within GitLab CI/CD environments.

It integrates IAM role management,
runner configuration, and defines stages and jobs for the deployment workflow.

#### Initializers <a name="Initializers" id="projen-pipelines.GitlabCDKPipeline.Initializer"></a>

```typescript
import { GitlabCDKPipeline } from 'projen-pipelines'

new GitlabCDKPipeline(app: AwsCdkTypeScriptApp, options: GitlabCDKPipelineOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.Initializer.parameter.app">app</a></code> | <code>projen.awscdk.AwsCdkTypeScriptApp</code> | - The AWS CDK app associated with the pipeline. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.Initializer.parameter.options">options</a></code> | <code><a href="#projen-pipelines.GitlabCDKPipelineOptions">GitlabCDKPipelineOptions</a></code> | - Configuration options for the pipeline. |

---

##### `app`<sup>Required</sup> <a name="app" id="projen-pipelines.GitlabCDKPipeline.Initializer.parameter.app"></a>

- *Type:* projen.awscdk.AwsCdkTypeScriptApp

The AWS CDK app associated with the pipeline.

---

##### `options`<sup>Required</sup> <a name="options" id="projen-pipelines.GitlabCDKPipeline.Initializer.parameter.options"></a>

- *Type:* <a href="#projen-pipelines.GitlabCDKPipelineOptions">GitlabCDKPipelineOptions</a>

Configuration options for the pipeline.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.engineType">engineType</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="projen-pipelines.GitlabCDKPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="projen-pipelines.GitlabCDKPipeline.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen-pipelines.GitlabCDKPipeline.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen-pipelines.GitlabCDKPipeline.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `engineType` <a name="engineType" id="projen-pipelines.GitlabCDKPipeline.engineType"></a>

```typescript
public engineType(): PipelineEngine
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="projen-pipelines.GitlabCDKPipeline.isConstruct"></a>

```typescript
import { GitlabCDKPipeline } from 'projen-pipelines'

GitlabCDKPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.GitlabCDKPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="projen-pipelines.GitlabCDKPipeline.isComponent"></a>

```typescript
import { GitlabCDKPipeline } from 'projen-pipelines'

GitlabCDKPipeline.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="projen-pipelines.GitlabCDKPipeline.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.property.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.property.config">config</a></code> | <code>projen.gitlab.GitlabConfiguration</code> | GitLab CI/CD configuration object. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.property.jobImage">jobImage</a></code> | <code>string</code> | The Docker image used for pipeline jobs. |
| <code><a href="#projen-pipelines.GitlabCDKPipeline.property.needsVersionedArtifacts">needsVersionedArtifacts</a></code> | <code>boolean</code> | Indicates if versioned artifacts are required. |

---

##### `node`<sup>Required</sup> <a name="node" id="projen-pipelines.GitlabCDKPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="projen-pipelines.GitlabCDKPipeline.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="projen-pipelines.GitlabCDKPipeline.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

---

##### `stackPrefix`<sup>Required</sup> <a name="stackPrefix" id="projen-pipelines.GitlabCDKPipeline.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string

---

##### `config`<sup>Required</sup> <a name="config" id="projen-pipelines.GitlabCDKPipeline.property.config"></a>

```typescript
public readonly config: GitlabConfiguration;
```

- *Type:* projen.gitlab.GitlabConfiguration

GitLab CI/CD configuration object.

---

##### `jobImage`<sup>Required</sup> <a name="jobImage" id="projen-pipelines.GitlabCDKPipeline.property.jobImage"></a>

```typescript
public readonly jobImage: string;
```

- *Type:* string

The Docker image used for pipeline jobs.

Defaults to a specified image or a default value.

---

##### `needsVersionedArtifacts`<sup>Required</sup> <a name="needsVersionedArtifacts" id="projen-pipelines.GitlabCDKPipeline.property.needsVersionedArtifacts"></a>

```typescript
public readonly needsVersionedArtifacts: boolean;
```

- *Type:* boolean

Indicates if versioned artifacts are required.

Currently set to false

---


## Structs <a name="Structs" id="Structs"></a>

### BashCDKPipelineOptions <a name="BashCDKPipelineOptions" id="projen-pipelines.BashCDKPipelineOptions"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.BashCDKPipelineOptions.Initializer"></a>

```typescript
import { BashCDKPipelineOptions } from 'projen-pipelines'

const bashCDKPipelineOptions: BashCDKPipelineOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.pkgNamespace">pkgNamespace</a></code> | <code>string</code> | This field determines the NPM namespace to be used when packaging CDK cloud assemblies. |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.stages">stages</a></code> | <code><a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.branchName">branchName</a></code> | <code>string</code> | the name of the branch to deploy from. |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.deploySubStacks">deploySubStacks</a></code> | <code>boolean</code> | If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack. |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.featureStages">featureStages</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.personalStage">personalStage</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.postSynthCommands">postSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.postSynthSteps">postSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.preInstallCommands">preInstallCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.preInstallSteps">preInstallSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.preSynthCommands">preSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.preSynthSteps">preSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.BashCDKPipelineOptions.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation. |

---

##### `pkgNamespace`<sup>Required</sup> <a name="pkgNamespace" id="projen-pipelines.BashCDKPipelineOptions.property.pkgNamespace"></a>

```typescript
public readonly pkgNamespace: string;
```

- *Type:* string

This field determines the NPM namespace to be used when packaging CDK cloud assemblies.

A namespace helps group related resources together, providing
better organization and ease of management.

---

##### `stages`<sup>Required</sup> <a name="stages" id="projen-pipelines.BashCDKPipelineOptions.property.stages"></a>

```typescript
public readonly stages: DeploymentStage[];
```

- *Type:* <a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]

---

##### `branchName`<sup>Optional</sup> <a name="branchName" id="projen-pipelines.BashCDKPipelineOptions.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string
- *Default:* main

the name of the branch to deploy from.

---

##### `deploySubStacks`<sup>Optional</sup> <a name="deploySubStacks" id="projen-pipelines.BashCDKPipelineOptions.property.deploySubStacks"></a>

```typescript
public readonly deploySubStacks: boolean;
```

- *Type:* boolean
- *Default:* false

If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack.

You can use this to deploy CDk applications containing multiple stacks.

---

##### `featureStages`<sup>Optional</sup> <a name="featureStages" id="projen-pipelines.BashCDKPipelineOptions.property.featureStages"></a>

```typescript
public readonly featureStages: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `personalStage`<sup>Optional</sup> <a name="personalStage" id="projen-pipelines.BashCDKPipelineOptions.property.personalStage"></a>

```typescript
public readonly personalStage: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `postSynthCommands`<sup>Optional</sup> <a name="postSynthCommands" id="projen-pipelines.BashCDKPipelineOptions.property.postSynthCommands"></a>

```typescript
public readonly postSynthCommands: string[];
```

- *Type:* string[]

---

##### `postSynthSteps`<sup>Optional</sup> <a name="postSynthSteps" id="projen-pipelines.BashCDKPipelineOptions.property.postSynthSteps"></a>

```typescript
public readonly postSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preInstallCommands`<sup>Optional</sup> <a name="preInstallCommands" id="projen-pipelines.BashCDKPipelineOptions.property.preInstallCommands"></a>

```typescript
public readonly preInstallCommands: string[];
```

- *Type:* string[]

---

##### `preInstallSteps`<sup>Optional</sup> <a name="preInstallSteps" id="projen-pipelines.BashCDKPipelineOptions.property.preInstallSteps"></a>

```typescript
public readonly preInstallSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preSynthCommands`<sup>Optional</sup> <a name="preSynthCommands" id="projen-pipelines.BashCDKPipelineOptions.property.preSynthCommands"></a>

```typescript
public readonly preSynthCommands: string[];
```

- *Type:* string[]

---

##### `preSynthSteps`<sup>Optional</sup> <a name="preSynthSteps" id="projen-pipelines.BashCDKPipelineOptions.property.preSynthSteps"></a>

```typescript
public readonly preSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `stackPrefix`<sup>Optional</sup> <a name="stackPrefix" id="projen-pipelines.BashCDKPipelineOptions.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string
- *Default:* project name

This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation.

---

### BashStep <a name="BashStep" id="projen-pipelines.BashStep"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.BashStep.Initializer"></a>

```typescript
import { BashStep } from 'projen-pipelines'

const bashStep: BashStep = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.BashStep.property.commands">commands</a></code> | <code>string[]</code> | *No description.* |

---

##### `commands`<sup>Required</sup> <a name="commands" id="projen-pipelines.BashStep.property.commands"></a>

```typescript
public readonly commands: string[];
```

- *Type:* string[]

---

### CDKPipelineOptions <a name="CDKPipelineOptions" id="projen-pipelines.CDKPipelineOptions"></a>

The CDKPipelineOptions interface is designed to provide configuration options for a CDK (Cloud Development Kit) pipeline.

It allows the definition
of settings such as the stack prefix and package namespace to be used in the
AWS stack, along with the environments configuration to be used.

#### Initializer <a name="Initializer" id="projen-pipelines.CDKPipelineOptions.Initializer"></a>

```typescript
import { CDKPipelineOptions } from 'projen-pipelines'

const cDKPipelineOptions: CDKPipelineOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.pkgNamespace">pkgNamespace</a></code> | <code>string</code> | This field determines the NPM namespace to be used when packaging CDK cloud assemblies. |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.stages">stages</a></code> | <code><a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.branchName">branchName</a></code> | <code>string</code> | the name of the branch to deploy from. |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.deploySubStacks">deploySubStacks</a></code> | <code>boolean</code> | If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack. |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.featureStages">featureStages</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.personalStage">personalStage</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.postSynthCommands">postSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.postSynthSteps">postSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.preInstallCommands">preInstallCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.preInstallSteps">preInstallSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.preSynthCommands">preSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.preSynthSteps">preSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.CDKPipelineOptions.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation. |

---

##### `pkgNamespace`<sup>Required</sup> <a name="pkgNamespace" id="projen-pipelines.CDKPipelineOptions.property.pkgNamespace"></a>

```typescript
public readonly pkgNamespace: string;
```

- *Type:* string

This field determines the NPM namespace to be used when packaging CDK cloud assemblies.

A namespace helps group related resources together, providing
better organization and ease of management.

---

##### `stages`<sup>Required</sup> <a name="stages" id="projen-pipelines.CDKPipelineOptions.property.stages"></a>

```typescript
public readonly stages: DeploymentStage[];
```

- *Type:* <a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]

---

##### `branchName`<sup>Optional</sup> <a name="branchName" id="projen-pipelines.CDKPipelineOptions.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string
- *Default:* main

the name of the branch to deploy from.

---

##### `deploySubStacks`<sup>Optional</sup> <a name="deploySubStacks" id="projen-pipelines.CDKPipelineOptions.property.deploySubStacks"></a>

```typescript
public readonly deploySubStacks: boolean;
```

- *Type:* boolean
- *Default:* false

If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack.

You can use this to deploy CDk applications containing multiple stacks.

---

##### `featureStages`<sup>Optional</sup> <a name="featureStages" id="projen-pipelines.CDKPipelineOptions.property.featureStages"></a>

```typescript
public readonly featureStages: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `personalStage`<sup>Optional</sup> <a name="personalStage" id="projen-pipelines.CDKPipelineOptions.property.personalStage"></a>

```typescript
public readonly personalStage: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `postSynthCommands`<sup>Optional</sup> <a name="postSynthCommands" id="projen-pipelines.CDKPipelineOptions.property.postSynthCommands"></a>

```typescript
public readonly postSynthCommands: string[];
```

- *Type:* string[]

---

##### `postSynthSteps`<sup>Optional</sup> <a name="postSynthSteps" id="projen-pipelines.CDKPipelineOptions.property.postSynthSteps"></a>

```typescript
public readonly postSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preInstallCommands`<sup>Optional</sup> <a name="preInstallCommands" id="projen-pipelines.CDKPipelineOptions.property.preInstallCommands"></a>

```typescript
public readonly preInstallCommands: string[];
```

- *Type:* string[]

---

##### `preInstallSteps`<sup>Optional</sup> <a name="preInstallSteps" id="projen-pipelines.CDKPipelineOptions.property.preInstallSteps"></a>

```typescript
public readonly preInstallSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preSynthCommands`<sup>Optional</sup> <a name="preSynthCommands" id="projen-pipelines.CDKPipelineOptions.property.preSynthCommands"></a>

```typescript
public readonly preSynthCommands: string[];
```

- *Type:* string[]

---

##### `preSynthSteps`<sup>Optional</sup> <a name="preSynthSteps" id="projen-pipelines.CDKPipelineOptions.property.preSynthSteps"></a>

```typescript
public readonly preSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `stackPrefix`<sup>Optional</sup> <a name="stackPrefix" id="projen-pipelines.CDKPipelineOptions.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string
- *Default:* project name

This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation.

---

### DeploymentStage <a name="DeploymentStage" id="projen-pipelines.DeploymentStage"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.DeploymentStage.Initializer"></a>

```typescript
import { DeploymentStage } from 'projen-pipelines'

const deploymentStage: DeploymentStage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.DeploymentStage.property.env">env</a></code> | <code><a href="#projen-pipelines.Environment">Environment</a></code> | *No description.* |
| <code><a href="#projen-pipelines.DeploymentStage.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.DeploymentStage.property.manualApproval">manualApproval</a></code> | <code>boolean</code> | *No description.* |

---

##### `env`<sup>Required</sup> <a name="env" id="projen-pipelines.DeploymentStage.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* <a href="#projen-pipelines.Environment">Environment</a>

---

##### `name`<sup>Required</sup> <a name="name" id="projen-pipelines.DeploymentStage.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `manualApproval`<sup>Optional</sup> <a name="manualApproval" id="projen-pipelines.DeploymentStage.property.manualApproval"></a>

```typescript
public readonly manualApproval: boolean;
```

- *Type:* boolean

---

### Environment <a name="Environment" id="projen-pipelines.Environment"></a>

The Environment interface is designed to hold AWS related information for a specific deployment environment within your infrastructure.

Each environment requires a specific account and region for its resources.

#### Initializer <a name="Initializer" id="projen-pipelines.Environment.Initializer"></a>

```typescript
import { Environment } from 'projen-pipelines'

const environment: Environment = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.Environment.property.account">account</a></code> | <code>string</code> | The AWS Account ID associated with the environment. |
| <code><a href="#projen-pipelines.Environment.property.region">region</a></code> | <code>string</code> | The AWS Region for the environment. |

---

##### `account`<sup>Required</sup> <a name="account" id="projen-pipelines.Environment.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS Account ID associated with the environment.

It's important because
different services or features could have distinct permissions and settings
in different accounts.

---

##### `region`<sup>Required</sup> <a name="region" id="projen-pipelines.Environment.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS Region for the environment.

This determines where your resources
are created and where your application will run. It can affect latency,
availability, and pricing.

---

### GithubCDKPipelineOptions <a name="GithubCDKPipelineOptions" id="projen-pipelines.GithubCDKPipelineOptions"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.GithubCDKPipelineOptions.Initializer"></a>

```typescript
import { GithubCDKPipelineOptions } from 'projen-pipelines'

const githubCDKPipelineOptions: GithubCDKPipelineOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.pkgNamespace">pkgNamespace</a></code> | <code>string</code> | This field determines the NPM namespace to be used when packaging CDK cloud assemblies. |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.stages">stages</a></code> | <code><a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.branchName">branchName</a></code> | <code>string</code> | the name of the branch to deploy from. |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.deploySubStacks">deploySubStacks</a></code> | <code>boolean</code> | If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack. |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.featureStages">featureStages</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.personalStage">personalStage</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.postSynthCommands">postSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.postSynthSteps">postSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.preInstallCommands">preInstallCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.preInstallSteps">preInstallSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.preSynthCommands">preSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.preSynthSteps">preSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation. |
| <code><a href="#projen-pipelines.GithubCDKPipelineOptions.property.iamRoleArns">iamRoleArns</a></code> | <code><a href="#projen-pipelines.GithubIamRoleConfig">GithubIamRoleConfig</a></code> | *No description.* |

---

##### `pkgNamespace`<sup>Required</sup> <a name="pkgNamespace" id="projen-pipelines.GithubCDKPipelineOptions.property.pkgNamespace"></a>

```typescript
public readonly pkgNamespace: string;
```

- *Type:* string

This field determines the NPM namespace to be used when packaging CDK cloud assemblies.

A namespace helps group related resources together, providing
better organization and ease of management.

---

##### `stages`<sup>Required</sup> <a name="stages" id="projen-pipelines.GithubCDKPipelineOptions.property.stages"></a>

```typescript
public readonly stages: DeploymentStage[];
```

- *Type:* <a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]

---

##### `branchName`<sup>Optional</sup> <a name="branchName" id="projen-pipelines.GithubCDKPipelineOptions.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string
- *Default:* main

the name of the branch to deploy from.

---

##### `deploySubStacks`<sup>Optional</sup> <a name="deploySubStacks" id="projen-pipelines.GithubCDKPipelineOptions.property.deploySubStacks"></a>

```typescript
public readonly deploySubStacks: boolean;
```

- *Type:* boolean
- *Default:* false

If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack.

You can use this to deploy CDk applications containing multiple stacks.

---

##### `featureStages`<sup>Optional</sup> <a name="featureStages" id="projen-pipelines.GithubCDKPipelineOptions.property.featureStages"></a>

```typescript
public readonly featureStages: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `personalStage`<sup>Optional</sup> <a name="personalStage" id="projen-pipelines.GithubCDKPipelineOptions.property.personalStage"></a>

```typescript
public readonly personalStage: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `postSynthCommands`<sup>Optional</sup> <a name="postSynthCommands" id="projen-pipelines.GithubCDKPipelineOptions.property.postSynthCommands"></a>

```typescript
public readonly postSynthCommands: string[];
```

- *Type:* string[]

---

##### `postSynthSteps`<sup>Optional</sup> <a name="postSynthSteps" id="projen-pipelines.GithubCDKPipelineOptions.property.postSynthSteps"></a>

```typescript
public readonly postSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preInstallCommands`<sup>Optional</sup> <a name="preInstallCommands" id="projen-pipelines.GithubCDKPipelineOptions.property.preInstallCommands"></a>

```typescript
public readonly preInstallCommands: string[];
```

- *Type:* string[]

---

##### `preInstallSteps`<sup>Optional</sup> <a name="preInstallSteps" id="projen-pipelines.GithubCDKPipelineOptions.property.preInstallSteps"></a>

```typescript
public readonly preInstallSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preSynthCommands`<sup>Optional</sup> <a name="preSynthCommands" id="projen-pipelines.GithubCDKPipelineOptions.property.preSynthCommands"></a>

```typescript
public readonly preSynthCommands: string[];
```

- *Type:* string[]

---

##### `preSynthSteps`<sup>Optional</sup> <a name="preSynthSteps" id="projen-pipelines.GithubCDKPipelineOptions.property.preSynthSteps"></a>

```typescript
public readonly preSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `stackPrefix`<sup>Optional</sup> <a name="stackPrefix" id="projen-pipelines.GithubCDKPipelineOptions.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string
- *Default:* project name

This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation.

---

##### `iamRoleArns`<sup>Required</sup> <a name="iamRoleArns" id="projen-pipelines.GithubCDKPipelineOptions.property.iamRoleArns"></a>

```typescript
public readonly iamRoleArns: GithubIamRoleConfig;
```

- *Type:* <a href="#projen-pipelines.GithubIamRoleConfig">GithubIamRoleConfig</a>

---

### GithubIamRoleConfig <a name="GithubIamRoleConfig" id="projen-pipelines.GithubIamRoleConfig"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.GithubIamRoleConfig.Initializer"></a>

```typescript
import { GithubIamRoleConfig } from 'projen-pipelines'

const githubIamRoleConfig: GithubIamRoleConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GithubIamRoleConfig.property.assetPublishing">assetPublishing</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubIamRoleConfig.property.default">default</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubIamRoleConfig.property.deployment">deployment</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubIamRoleConfig.property.synth">synth</a></code> | <code>string</code> | *No description.* |

---

##### `assetPublishing`<sup>Optional</sup> <a name="assetPublishing" id="projen-pipelines.GithubIamRoleConfig.property.assetPublishing"></a>

```typescript
public readonly assetPublishing: string;
```

- *Type:* string

---

##### `default`<sup>Optional</sup> <a name="default" id="projen-pipelines.GithubIamRoleConfig.property.default"></a>

```typescript
public readonly default: string;
```

- *Type:* string

---

##### `deployment`<sup>Optional</sup> <a name="deployment" id="projen-pipelines.GithubIamRoleConfig.property.deployment"></a>

```typescript
public readonly deployment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `synth`<sup>Optional</sup> <a name="synth" id="projen-pipelines.GithubIamRoleConfig.property.synth"></a>

```typescript
public readonly synth: string;
```

- *Type:* string

---

### GithubStep <a name="GithubStep" id="projen-pipelines.GithubStep"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.GithubStep.Initializer"></a>

```typescript
import { GithubStep } from 'projen-pipelines'

const githubStep: GithubStep = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GithubStep.property.needs">needs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GithubStep.property.steps">steps</a></code> | <code>projen.github.workflows.JobStep[]</code> | *No description.* |

---

##### `needs`<sup>Required</sup> <a name="needs" id="projen-pipelines.GithubStep.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

---

##### `steps`<sup>Required</sup> <a name="steps" id="projen-pipelines.GithubStep.property.steps"></a>

```typescript
public readonly steps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

---

### GitlabCDKPipelineOptions <a name="GitlabCDKPipelineOptions" id="projen-pipelines.GitlabCDKPipelineOptions"></a>

Options for configuring the GitLab CDK pipeline, extending the base CDK pipeline options.

#### Initializer <a name="Initializer" id="projen-pipelines.GitlabCDKPipelineOptions.Initializer"></a>

```typescript
import { GitlabCDKPipelineOptions } from 'projen-pipelines'

const gitlabCDKPipelineOptions: GitlabCDKPipelineOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.pkgNamespace">pkgNamespace</a></code> | <code>string</code> | This field determines the NPM namespace to be used when packaging CDK cloud assemblies. |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.stages">stages</a></code> | <code><a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.branchName">branchName</a></code> | <code>string</code> | the name of the branch to deploy from. |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.deploySubStacks">deploySubStacks</a></code> | <code>boolean</code> | If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack. |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.featureStages">featureStages</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.personalStage">personalStage</a></code> | <code><a href="#projen-pipelines.StageOptions">StageOptions</a></code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.postSynthCommands">postSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.postSynthSteps">postSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.preInstallCommands">preInstallCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.preInstallSteps">preInstallSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.preSynthCommands">preSynthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.preSynthSteps">preSynthSteps</a></code> | <code><a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.stackPrefix">stackPrefix</a></code> | <code>string</code> | This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation. |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.iamRoleArns">iamRoleArns</a></code> | <code><a href="#projen-pipelines.GitlabIamRoleConfig">GitlabIamRoleConfig</a></code> | IAM role ARNs configuration for the pipeline. |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.image">image</a></code> | <code>string</code> | The Docker image to use for running the pipeline jobs. |
| <code><a href="#projen-pipelines.GitlabCDKPipelineOptions.property.runnerTags">runnerTags</a></code> | <code><a href="#projen-pipelines.GitlabRunnerTags">GitlabRunnerTags</a></code> | Runner tags configuration for the pipeline. |

---

##### `pkgNamespace`<sup>Required</sup> <a name="pkgNamespace" id="projen-pipelines.GitlabCDKPipelineOptions.property.pkgNamespace"></a>

```typescript
public readonly pkgNamespace: string;
```

- *Type:* string

This field determines the NPM namespace to be used when packaging CDK cloud assemblies.

A namespace helps group related resources together, providing
better organization and ease of management.

---

##### `stages`<sup>Required</sup> <a name="stages" id="projen-pipelines.GitlabCDKPipelineOptions.property.stages"></a>

```typescript
public readonly stages: DeploymentStage[];
```

- *Type:* <a href="#projen-pipelines.DeploymentStage">DeploymentStage</a>[]

---

##### `branchName`<sup>Optional</sup> <a name="branchName" id="projen-pipelines.GitlabCDKPipelineOptions.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string
- *Default:* main

the name of the branch to deploy from.

---

##### `deploySubStacks`<sup>Optional</sup> <a name="deploySubStacks" id="projen-pipelines.GitlabCDKPipelineOptions.property.deploySubStacks"></a>

```typescript
public readonly deploySubStacks: boolean;
```

- *Type:* boolean
- *Default:* false

If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack.

You can use this to deploy CDk applications containing multiple stacks.

---

##### `featureStages`<sup>Optional</sup> <a name="featureStages" id="projen-pipelines.GitlabCDKPipelineOptions.property.featureStages"></a>

```typescript
public readonly featureStages: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `personalStage`<sup>Optional</sup> <a name="personalStage" id="projen-pipelines.GitlabCDKPipelineOptions.property.personalStage"></a>

```typescript
public readonly personalStage: StageOptions;
```

- *Type:* <a href="#projen-pipelines.StageOptions">StageOptions</a>

---

##### `postSynthCommands`<sup>Optional</sup> <a name="postSynthCommands" id="projen-pipelines.GitlabCDKPipelineOptions.property.postSynthCommands"></a>

```typescript
public readonly postSynthCommands: string[];
```

- *Type:* string[]

---

##### `postSynthSteps`<sup>Optional</sup> <a name="postSynthSteps" id="projen-pipelines.GitlabCDKPipelineOptions.property.postSynthSteps"></a>

```typescript
public readonly postSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preInstallCommands`<sup>Optional</sup> <a name="preInstallCommands" id="projen-pipelines.GitlabCDKPipelineOptions.property.preInstallCommands"></a>

```typescript
public readonly preInstallCommands: string[];
```

- *Type:* string[]

---

##### `preInstallSteps`<sup>Optional</sup> <a name="preInstallSteps" id="projen-pipelines.GitlabCDKPipelineOptions.property.preInstallSteps"></a>

```typescript
public readonly preInstallSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `preSynthCommands`<sup>Optional</sup> <a name="preSynthCommands" id="projen-pipelines.GitlabCDKPipelineOptions.property.preSynthCommands"></a>

```typescript
public readonly preSynthCommands: string[];
```

- *Type:* string[]

---

##### `preSynthSteps`<sup>Optional</sup> <a name="preSynthSteps" id="projen-pipelines.GitlabCDKPipelineOptions.property.preSynthSteps"></a>

```typescript
public readonly preSynthSteps: PipelineStep[];
```

- *Type:* <a href="#projen-pipelines.PipelineStep">PipelineStep</a>[]

---

##### `stackPrefix`<sup>Optional</sup> <a name="stackPrefix" id="projen-pipelines.GitlabCDKPipelineOptions.property.stackPrefix"></a>

```typescript
public readonly stackPrefix: string;
```

- *Type:* string
- *Default:* project name

This field is used to define a prefix for the AWS Stack resources created during the pipeline's operation.

---

##### `iamRoleArns`<sup>Required</sup> <a name="iamRoleArns" id="projen-pipelines.GitlabCDKPipelineOptions.property.iamRoleArns"></a>

```typescript
public readonly iamRoleArns: GitlabIamRoleConfig;
```

- *Type:* <a href="#projen-pipelines.GitlabIamRoleConfig">GitlabIamRoleConfig</a>

IAM role ARNs configuration for the pipeline.

---

##### `image`<sup>Optional</sup> <a name="image" id="projen-pipelines.GitlabCDKPipelineOptions.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

The Docker image to use for running the pipeline jobs.

---

##### `runnerTags`<sup>Optional</sup> <a name="runnerTags" id="projen-pipelines.GitlabCDKPipelineOptions.property.runnerTags"></a>

```typescript
public readonly runnerTags: GitlabRunnerTags;
```

- *Type:* <a href="#projen-pipelines.GitlabRunnerTags">GitlabRunnerTags</a>

Runner tags configuration for the pipeline.

---

### GitlabIamRoleConfig <a name="GitlabIamRoleConfig" id="projen-pipelines.GitlabIamRoleConfig"></a>

Configuration for IAM roles used within the GitLab CI/CD pipeline for various stages.

Allows specifying different IAM roles for synthesis, asset publishing, and deployment stages,
providing granular control over permissions.

#### Initializer <a name="Initializer" id="projen-pipelines.GitlabIamRoleConfig.Initializer"></a>

```typescript
import { GitlabIamRoleConfig } from 'projen-pipelines'

const gitlabIamRoleConfig: GitlabIamRoleConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GitlabIamRoleConfig.property.assetPublishing">assetPublishing</a></code> | <code>string</code> | IAM role ARN for the asset publishing stage. |
| <code><a href="#projen-pipelines.GitlabIamRoleConfig.property.default">default</a></code> | <code>string</code> | Default IAM role ARN used if specific stage role is not provided. |
| <code><a href="#projen-pipelines.GitlabIamRoleConfig.property.deployment">deployment</a></code> | <code>{[ key: string ]: string}</code> | A map of stage names to IAM role ARNs for the deployment operation. |
| <code><a href="#projen-pipelines.GitlabIamRoleConfig.property.diff">diff</a></code> | <code>{[ key: string ]: string}</code> | A map of stage names to IAM role ARNs for the diff operation. |
| <code><a href="#projen-pipelines.GitlabIamRoleConfig.property.synth">synth</a></code> | <code>string</code> | IAM role ARN for the synthesis stage. |

---

##### `assetPublishing`<sup>Optional</sup> <a name="assetPublishing" id="projen-pipelines.GitlabIamRoleConfig.property.assetPublishing"></a>

```typescript
public readonly assetPublishing: string;
```

- *Type:* string

IAM role ARN for the asset publishing stage.

---

##### `default`<sup>Optional</sup> <a name="default" id="projen-pipelines.GitlabIamRoleConfig.property.default"></a>

```typescript
public readonly default: string;
```

- *Type:* string

Default IAM role ARN used if specific stage role is not provided.

---

##### `deployment`<sup>Optional</sup> <a name="deployment" id="projen-pipelines.GitlabIamRoleConfig.property.deployment"></a>

```typescript
public readonly deployment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A map of stage names to IAM role ARNs for the deployment operation.

---

##### `diff`<sup>Optional</sup> <a name="diff" id="projen-pipelines.GitlabIamRoleConfig.property.diff"></a>

```typescript
public readonly diff: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A map of stage names to IAM role ARNs for the diff operation.

---

##### `synth`<sup>Optional</sup> <a name="synth" id="projen-pipelines.GitlabIamRoleConfig.property.synth"></a>

```typescript
public readonly synth: string;
```

- *Type:* string

IAM role ARN for the synthesis stage.

---

### GitlabRunnerTags <a name="GitlabRunnerTags" id="projen-pipelines.GitlabRunnerTags"></a>

Configuration for GitLab runner tags used within the CI/CD pipeline for various stages.

This allows for specifying different runners based on the tags for different stages of the pipeline.

#### Initializer <a name="Initializer" id="projen-pipelines.GitlabRunnerTags.Initializer"></a>

```typescript
import { GitlabRunnerTags } from 'projen-pipelines'

const gitlabRunnerTags: GitlabRunnerTags = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GitlabRunnerTags.property.assetPublishing">assetPublishing</a></code> | <code>string[]</code> | Runner tags for the asset publishing stage. |
| <code><a href="#projen-pipelines.GitlabRunnerTags.property.default">default</a></code> | <code>string[]</code> | Default runner tags used if specific stage tags are not provided. |
| <code><a href="#projen-pipelines.GitlabRunnerTags.property.deployment">deployment</a></code> | <code>{[ key: string ]: string[]}</code> | A map of stage names to runner tags for the deployment operation. |
| <code><a href="#projen-pipelines.GitlabRunnerTags.property.diff">diff</a></code> | <code>{[ key: string ]: string[]}</code> | A map of stage names to runner tags for the diff operation. |
| <code><a href="#projen-pipelines.GitlabRunnerTags.property.synth">synth</a></code> | <code>string[]</code> | Runner tags for the synthesis stage. |

---

##### `assetPublishing`<sup>Optional</sup> <a name="assetPublishing" id="projen-pipelines.GitlabRunnerTags.property.assetPublishing"></a>

```typescript
public readonly assetPublishing: string[];
```

- *Type:* string[]

Runner tags for the asset publishing stage.

---

##### `default`<sup>Optional</sup> <a name="default" id="projen-pipelines.GitlabRunnerTags.property.default"></a>

```typescript
public readonly default: string[];
```

- *Type:* string[]

Default runner tags used if specific stage tags are not provided.

---

##### `deployment`<sup>Optional</sup> <a name="deployment" id="projen-pipelines.GitlabRunnerTags.property.deployment"></a>

```typescript
public readonly deployment: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

A map of stage names to runner tags for the deployment operation.

---

##### `diff`<sup>Optional</sup> <a name="diff" id="projen-pipelines.GitlabRunnerTags.property.diff"></a>

```typescript
public readonly diff: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

A map of stage names to runner tags for the diff operation.

---

##### `synth`<sup>Optional</sup> <a name="synth" id="projen-pipelines.GitlabRunnerTags.property.synth"></a>

```typescript
public readonly synth: string[];
```

- *Type:* string[]

Runner tags for the synthesis stage.

---

### GitlabStep <a name="GitlabStep" id="projen-pipelines.GitlabStep"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.GitlabStep.Initializer"></a>

```typescript
import { GitlabStep } from 'projen-pipelines'

const gitlabStep: GitlabStep = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.GitlabStep.property.commands">commands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabStep.property.extensions">extensions</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen-pipelines.GitlabStep.property.needs">needs</a></code> | <code>projen.gitlab.Need[]</code> | *No description.* |

---

##### `commands`<sup>Required</sup> <a name="commands" id="projen-pipelines.GitlabStep.property.commands"></a>

```typescript
public readonly commands: string[];
```

- *Type:* string[]

---

##### `extensions`<sup>Required</sup> <a name="extensions" id="projen-pipelines.GitlabStep.property.extensions"></a>

```typescript
public readonly extensions: string[];
```

- *Type:* string[]

---

##### `needs`<sup>Required</sup> <a name="needs" id="projen-pipelines.GitlabStep.property.needs"></a>

```typescript
public readonly needs: Need[];
```

- *Type:* projen.gitlab.Need[]

---

### StageOptions <a name="StageOptions" id="projen-pipelines.StageOptions"></a>

#### Initializer <a name="Initializer" id="projen-pipelines.StageOptions.Initializer"></a>

```typescript
import { StageOptions } from 'projen-pipelines'

const stageOptions: StageOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.StageOptions.property.env">env</a></code> | <code><a href="#projen-pipelines.Environment">Environment</a></code> | *No description.* |

---

##### `env`<sup>Required</sup> <a name="env" id="projen-pipelines.StageOptions.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* <a href="#projen-pipelines.Environment">Environment</a>

---

## Classes <a name="Classes" id="Classes"></a>

### PipelineStep <a name="PipelineStep" id="projen-pipelines.PipelineStep"></a>

#### Initializers <a name="Initializers" id="projen-pipelines.PipelineStep.Initializer"></a>

```typescript
import { PipelineStep } from 'projen-pipelines'

new PipelineStep(project: Project)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.PipelineStep.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen-pipelines.PipelineStep.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.PipelineStep.toBash">toBash</a></code> | *No description.* |
| <code><a href="#projen-pipelines.PipelineStep.toGithub">toGithub</a></code> | *No description.* |
| <code><a href="#projen-pipelines.PipelineStep.toGitlab">toGitlab</a></code> | *No description.* |

---

##### `toBash` <a name="toBash" id="projen-pipelines.PipelineStep.toBash"></a>

```typescript
public toBash(): BashStep
```

##### `toGithub` <a name="toGithub" id="projen-pipelines.PipelineStep.toGithub"></a>

```typescript
public toGithub(): GithubStep
```

##### `toGitlab` <a name="toGitlab" id="projen-pipelines.PipelineStep.toGitlab"></a>

```typescript
public toGitlab(): GitlabStep
```




### SimpleCommandStep <a name="SimpleCommandStep" id="projen-pipelines.SimpleCommandStep"></a>

#### Initializers <a name="Initializers" id="projen-pipelines.SimpleCommandStep.Initializer"></a>

```typescript
import { SimpleCommandStep } from 'projen-pipelines'

new SimpleCommandStep(project: Project, commands: string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-pipelines.SimpleCommandStep.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#projen-pipelines.SimpleCommandStep.Initializer.parameter.commands">commands</a></code> | <code>string[]</code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen-pipelines.SimpleCommandStep.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `commands`<sup>Required</sup> <a name="commands" id="projen-pipelines.SimpleCommandStep.Initializer.parameter.commands"></a>

- *Type:* string[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.SimpleCommandStep.toBash">toBash</a></code> | *No description.* |
| <code><a href="#projen-pipelines.SimpleCommandStep.toGithub">toGithub</a></code> | *No description.* |
| <code><a href="#projen-pipelines.SimpleCommandStep.toGitlab">toGitlab</a></code> | *No description.* |

---

##### `toBash` <a name="toBash" id="projen-pipelines.SimpleCommandStep.toBash"></a>

```typescript
public toBash(): BashStep
```

##### `toGithub` <a name="toGithub" id="projen-pipelines.SimpleCommandStep.toGithub"></a>

```typescript
public toGithub(): GithubStep
```

##### `toGitlab` <a name="toGitlab" id="projen-pipelines.SimpleCommandStep.toGitlab"></a>

```typescript
public toGitlab(): GitlabStep
```





## Enums <a name="Enums" id="Enums"></a>

### PipelineEngine <a name="PipelineEngine" id="projen-pipelines.PipelineEngine"></a>

The CI/CD tooling used to run your pipeline.

The component will render workflows for the given system

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-pipelines.PipelineEngine.GITHUB">GITHUB</a></code> | Create GitHub actions. |
| <code><a href="#projen-pipelines.PipelineEngine.GITLAB">GITLAB</a></code> | Create a .gitlab-ci.yaml file. |
| <code><a href="#projen-pipelines.PipelineEngine.BASH">BASH</a></code> | Create bash scripts. |

---

##### `GITHUB` <a name="GITHUB" id="projen-pipelines.PipelineEngine.GITHUB"></a>

Create GitHub actions.

---


##### `GITLAB` <a name="GITLAB" id="projen-pipelines.PipelineEngine.GITLAB"></a>

Create a .gitlab-ci.yaml file.

---


##### `BASH` <a name="BASH" id="projen-pipelines.PipelineEngine.BASH"></a>

Create bash scripts.

---

