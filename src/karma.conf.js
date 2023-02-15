// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      // jasmine: {
      //   // you can add configuration options for Jasmine here
      //   // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
      //   // for example, you can disable the random execution with `random: false`
      //   // or set a specific seed with `seed: 4321`
      // },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    // jasmineHtmlReporter: {
    //   suppressAll: true // removes the duplicated traces
    // },
    // coverageReporter: {
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reporters: ['html','Icovonly', 'text-summary'],
      fixWebpackSourcePaths:true
    },
    reporters: ['progress', 'kjhtml'],
    // preprocessors: {
    //   // source files, that you wanna generate coverage for
    //   // do not include tests or libraries
    //   // (these files will be instrumented by Istanbul)
    //   'src/**/*.js': ['coverage']
    // },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeDebugging'],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333']
      }
    }
  });
};
