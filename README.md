# js-validation

<h3>Examle form </h3>

```
<form class="form-validate" role="form">
  <input id="firstName" type="text" name="first_name" data-rules="required|string">
  <input id="Phone-number" type="text" name="telephone_number" data-rules="required|numeric|between" data-between="10,13">
  <input id="email" type="email" name="email" data-rules="required|email|confirmed" data-confirmed="email_confirmation">
  <input id="Repeat-email" type="email" name="email_confirmation" data-rules="required|email">
</form>
```

```
<script>
  import validation from '/validation.js';
  window.onload = validation.init();
</cript>
```
