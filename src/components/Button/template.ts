export default `
<button
  type="{{ htmlType }}"
  class="button {{ className }}"
  onclick="{{ onClick }}"
  {{#if disabled}}disabled{{/if}}
>
  {{{ children }}}
</button>
`;
