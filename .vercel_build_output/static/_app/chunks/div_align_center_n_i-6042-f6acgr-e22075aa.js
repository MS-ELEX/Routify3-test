var e=`<div align="center">
<img src="https://github.com/roxiness/configent/raw/master/configent.png" alt="configent">
</div>

<h1 id="configent">Configent</h1>
<h3 id="confident-configurations">Confident configurations</h3>
<p>No fuzz config compilation from (ordered by ascending precedence)</p>
<ul>
<li>defaults</li>
<li>package.json</li>
<li>[name].config.js</li>
<li>.env</li>
<li>environment</li>
<li>input</li>
</ul>
<pre><code class="language-javascript">/** 
 * package.json {&quot;foobar&quot;: {&quot;city&quot;: &quot;Portsmouth&quot;}}
 * foobar.config.js {lastSeen: &#39;Liverpool&#39;}
 * ({}).foobar_last_seen = London
 * options = { name: &#39;Sherlock Holmes&#39; }
*/

const defaults = { name: &#39;John Doe&#39;, city: &#39;N/A&#39;, lastSeen: &#39;N/A&#39; }

const config = configent(&#39;foobar&#39;, defaults, options)

/**
 * console.log(config)
 * {
 *   name: &#39;Sherlock Holmes&#39;,
 *   city: &#39;Portsmouth&#39;,
 *   lastSeen: &#39;London&#39;  
 * }
 * /
</code></pre>
<h3 id="auto-detect-defaults">Auto detect defaults</h3>
<p>Configent supports multiple default configs. These are added to <code>./configs</code>.</p>
<pre><code class="language-javascript">/** ./configs/routify2.config.js */

module.exports = {
    supersedes: [&#39;svelte&#39;],
    condition: ({ pkgjson }) =&gt; pkgjson.dependencies[&#39;@roxi/routify&#39;],
    config: () =&gt; ({ 
        /** the config object used as default */
        myAppName: &#39;Routify App&#39; 
    })
}
</code></pre>
<pre><code class="language-javascript">/** ./configs/svelte.config.js */

module.exports = {
    condition: ({ pkgjson }) =&gt; pkgjson.dependencies[&#39;svelte&#39;],
    config: () =&gt; ({ 
        /** the config object used as default */
        myAppName: &#39;Svelte App&#39; 
    })
}
</code></pre>
<p>The first config with a true condition is used. To avoid conflicts, configs using the  <code>supersedes</code> option, will run before their superseded targets.</p>
<p>To change the location of default configs, refer to <code>detectDefaultsConfigPath</code>.</p>
<h3 id="api">API</h3>
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

<h5 id="table-of-contents">Table of Contents</h5>
<ul>
<li><a href="#configent">configent</a><ul>
<li><a href="#parameters">Parameters</a></li>
</ul>
</li>
</ul>
<h4 id="configent-1">configent</h4>
<h5 id="parameters">Parameters</h5>
<ul>
<li><code>defaults</code> <strong>options</strong> default options</li>
<li><code>input</code> <strong>Partial&lt;options&gt;?</strong> provided input (optional, default <code>{}</code>)</li>
<li><code>configentOptions</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>?</strong> configent options<ul>
<li><code>configentOptions.name</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> name to use for configs. If left empty, name from package.json is used (optional, default <code>&#39;&#39;</code>)</li>
<li><code>configentOptions.cacheConfig</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> calling configent twice with same parameters will return the same instance (optional, default <code>true</code>)</li>
<li><code>configentOptions.cacheDetectedDefaults</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> calling configent twice from the same module will return the same defaults (optional, default <code>true</code>)</li>
<li><code>configentOptions.useDotEnv</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from .env files (optional, default <code>true</code>)</li>
<li><code>configentOptions.useEnv</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from process.env (optional, default <code>true</code>)</li>
<li><code>configentOptions.usePackageConfig</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from package.json (optional, default <code>true</code>)</li>
<li><code>configentOptions.useConfig</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from [name].config.js (optional, default <code>true</code>)</li>
<li><code>configentOptions.useDetectDefaults</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> detect defaults from context (package.json and file stucture) (optional, default <code>true</code>)</li>
<li><code>configentOptions.detectDefaultsConfigPath</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> detect defaults from context (package.json and file stucture) (optional, default <code>&#39;configs&#39;</code>)</li>
<li><code>configentOptions.sanitizeEnvValue</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></strong> sanitize environment values. Convert snake_case to camelCase by default. (optional, default <code>str=&gt;str.replace(/[-_][a-z]/g,str=&gt;str.substr(1).toUpperCase())</code>)</li>
<li><code>configentOptions.module</code> <strong>NodeModule?</strong> required if multiple modules are using configent</li>
</ul>
</li>
</ul>
<p>Returns <strong>options</strong> </p>
<h4 id=""></h4>
<hr>
<p><a href="https://www.freepik.com/vectors/vintage">Vintage vector created by macrovector - www.freepik.com</a></p>
`;export{e as default};
