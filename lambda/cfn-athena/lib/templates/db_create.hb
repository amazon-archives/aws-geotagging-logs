CREATE DATABASE IF NOT EXISTS {{Name}}
    {{#if Comment}} COMMENT '{{Comment}}' {{/if}}
    LOCATION 's3://{{MetaDataBucket}}/'
    {{#if Properties}}
        WITH DBPROPERTIES 
        {{#each Properties}} ('{{@key}}'='{{this}}'){{/each}}
    {{/if}}

