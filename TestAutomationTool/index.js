#! /usr/bin/env node

var parseString = require('xml2js').parseString;
var xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="Test_the_dolibar_login_feature_using_right_and_bad_credentials" timestamp="2018-03-20T22:27:27" time="10.757" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="a5f298c032343cd46bb5590949404f2f"/>
      <property name="suiteName" value="Test the dolibar login feature using right and bad credentials"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value="./features/test.feature"/>
    </properties>
  </testsuite>
  <testsuite name="should_fail_login" timestamp="2018-03-20T22:27:27" time="3.434" tests="5" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="a5f298c032343cd46bb5590949404f2f"/>
      <property name="suiteName" value="should fail login"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value="./features/test.feature"/>
    </properties>
    <testcase classname="chrome.should_fail_login" name="I_go_to_http_miso4208_on_dolicloud_com" time="10.928"/>
    <testcase classname="chrome.should_fail_login" name="I_write_wrongUser_text_on_the_username_locator" time="9.086"/>
    <testcase classname="chrome.should_fail_login" name="I_write_wrongPassword_text_on_the_password_locator" time="9.009"/>
    <testcase classname="chrome.should_fail_login" name="I_click_on_input_button_locator" time="8.936"/>
    <testcase classname="chrome.should_fail_login" name="I_wait_to_see_Bad_value_for_login_or_password_text_on_html_body_div_div_div_div_locator" time="7.543"/>
  </testsuite>
  <testsuite name="should_works_login" timestamp="2018-03-20T22:27:31" time="7.321" tests="5" failures="0" errors="1" skipped="0">
    <properties>
      <property name="specId" value="a5f298c032343cd46bb5590949404f2f"/>
      <property name="suiteName" value="should works login"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value="./features/test.feature"/>
    </properties>
    <testcase classname="chrome.should_works_login" name="I_go_to_http_miso4208_on_dolicloud_com" time="7.494"/>
    <testcase classname="chrome.should_works_login" name="I_write_admin_text_on_the_username_locator" time="7.192"/>
    <testcase classname="chrome.should_works_login" name="I_write_12345678_text_on_the_password_locator" time="7.144"/>
    <testcase classname="chrome.should_works_login" name="I_click_on_input_button_locator" time="7.096"/>
    <testcase classname="chrome.should_works_login" name="I_wait_to_see_My_dashboard_text_on_id_id_left_div_div_3_div_1_a_locator" time="5.767">
      <error message="element (&quot;//*[@id=&quot;id-left&quot;]/div/div[3]/div[1]/a&quot;) still not visible after 5000ms"/>
      <system-err>
        <![CDATA[
Error: element ("//*[@id="id-left"]/div/div[3]/div[1]/a") still not visible after 5000ms
    at elements("//*[@id="id-left"]/div/div[3]/div[1]/a") - isVisible.js:54:17
    at isVisible("//*[@id="id-left"]/div/div[3]/div[1]/a") - waitForVisible.js:73:22
]]>
      </system-err>
    </testcase>
  </testsuite>
</testsuites>`
parseString(xml, function (err, resultdata) {
    console.dir(resultdata.testsuites.testsuite[2]);
});