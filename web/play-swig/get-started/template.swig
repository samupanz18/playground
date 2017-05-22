<h1>{{ pagename|title }}</h1>
<ul>
{% for author in authors %}
  <li{% if loop.first %} class="first"{% endif %}>
    {{ author }}
  </li>
{% endfor %}
</ul>
<div>
  {{myStuff() | escape}}
</div>
{% for item in seq -%}
  {{ item }}
{%- endfor %}