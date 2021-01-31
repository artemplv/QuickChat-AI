export const template = `
<form id="{{ formId }}" class="form {{ className }}">
  {{{ mainContent }}}

  <div class="{{ controlsWrapperClassName }}">
    {{{ buttonOk }}}
    {{{ buttonCancel }}}
  </div>
</form>
`;
