# gulp-lighthouse

> When you really need a gulp plugin to run lighthouse


## Install

```
$ npm install --save-dev gulp-lighthouse
```


## Usage

```js
const gulp = require('gulp');
const lighthouse = require('gulp-lighthouse');
const lighthouseOptions = {
	url: 'http://google.com'
};

gulp.task('lighthouse', lighthouse(lighthouseOptions));
```


## API

### lighthouse([options])

#### options

##### url

Type: `string`<br>
Default: `''`

##### perf

Type: `boolean`<br>
Default: `false`

##### disableDeviceEmulation

Type: `boolean`<br>
Default: `false`

##### disableCPUThrottling

Type: `boolean`<br>
Default: `true`

##### disableNetworkThrottling

Type: `boolean`<br>
Default: `false`

##### saveAssets

Type: `boolean`<br>
Default: `false`

##### saveArtifacts

Type: `boolean`<br>
Default: `false`

## Todos
- switch chromeLauncher when https://github.com/GoogleChrome/lighthouse/pull/916 lands
- add more options
- make loglevel available as an option
- handle results according to options specified e.g. json, html, domhtml

## License

MIT © [Damian Leung](http://dstrct.io)
