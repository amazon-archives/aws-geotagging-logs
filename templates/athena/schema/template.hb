{{#each this.properties}}
    {{{parse_type @key this ' ' }}}{{#unless @last}},{{/unless}}
{{/each}}

