# FeatureFlag

The purpose of this component is to provide ability to turn on/off a feature inside a microsite component.

## Usage

### Regular

```html
<FeatureFlag name="feature">
    <div>Some HTML here</div>
</FeatureFlag>
```

Feature flag configs are provided by config server. If feature is turned on, the above code will render div tag
otherwise no content will be displayed

### Negate

Negate option can be used to diplay content when feature is turned off.

```html
<FeatureFlag name="!feature">
    <div>Some HTML here</div>
</FeatureFlag>
```

The above div will be rendered when feature is turned off.