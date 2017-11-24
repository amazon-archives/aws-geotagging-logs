CREATE EXTERNAL TABLE IF NOT EXISTS {{Database}}.{{Name}} 
    (
        {{{Schema}}}
    )
    ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
    LOCATION 's3://{{location}}/{{prefix}}';
