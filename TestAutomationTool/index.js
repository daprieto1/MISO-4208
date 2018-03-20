#! /usr/bin/env node

var parseString = require('xml2js').parseString;
var xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Mocha Tests" time="5.231" tests="2" failures="0">
  <testsuite name="Root Suite" timestamp="2018-03-20T03:07:06" tests="0" failures="0" time="0">
  </testsuite>
  <testsuite name="Dolibar Login" timestamp="2018-03-20T03:07:06" tests="2" failures="0" time="5.231">
    <testcase name="Dolibar Login should fail login" time="3.178" classname="should fail login">
    </testcase>
    <testcase name="Dolibar Login should works login" time="2.053" classname="should works login">
    </testcase>
  </testsuite>
</testsuites>`
parseString(xml, function (err, result) {
    console.dir(JSON.stringify(result));
});
