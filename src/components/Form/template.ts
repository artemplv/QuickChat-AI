export default `
<form
  id="{{ formId }}"
  class="form {{ className }}"
  {{#if isHidden}}
    hidden
  {{/if}}
>
  {{{ mainContent }}}

  <div
    class="form-controls-wrapper {{ controlsWrapperClassName }}"
    {{#if isControlsHidden}}
      hidden
    {{/if}}
  >
    {{{ buttonOk }}}
    {{{ buttonCancel }}}
  </div>
</form>
`;
