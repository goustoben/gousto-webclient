# Experimentation Tooling for React

These components give an integration with the Turnip's experimentation tooling.

## Usage

**note:** You must also add your experiment to the [userbucketing-function](https://github.com/Gousto/userbucketing-function/blob/develop/src/modules/userbucketing/experiments/experimentScenarios/exampleExperiment.ts)

The function inside the `ExperimentsContainer` is passed an Immutable JS object with the structure:

```typescript
{
    name: string,
    withinExperiment: boolean,
    bucket: string
}
```

```jsx
<ExperimentsContainer experimentName="my_cool_experiment">
    {(experiment) => <p>{experiment.get('bucket')}</p>}
</ExperimentsContainer>
```

It the experiment has not yet started, the bucket will always be `'control'`
