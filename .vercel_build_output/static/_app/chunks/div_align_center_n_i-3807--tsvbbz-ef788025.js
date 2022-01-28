var e=`<div align="center">
  <img src="https://github.com/roxiness/poindexter/raw/master/./poindexter.svg" width="300px">
  
<p>  <strong>Search engine for your static site.</strong></p>
<p>   Powered by <a href="https://github.com/nextapps-de/flexsearch">FlexSearch</a></p>
   <br />
   <br />
</div>


<p>Poindexter scans a folder for HTML files and indexes each file&#39;s content by its relative filename. The full index is output to <code>poindexter.bundle.js</code>, which can be imported and searched with poindexter or flexsearch.</p>
<h1 id="getting-started">Getting started</h1>
<h3 id="create-a-searchable-index">Create a searchable index</h3>
<pre><code>npx poindexter [HTML folder] -o [output path]
</code></pre>
<h3 id="searching-with-poindexter">Searching with Poindexter</h3>
<pre><code class="language-javascript">  import { client } from &quot;poindexter/runtime&quot;;  

  // loads the poindexter.bundle.json.
  // for custom path: \`client.init({ path: &#39;/path/to/poindexter.bundle.js&#39; })\`
  client.init()

  // search the index.
  client.index.search(query)
</code></pre>
<h3 id="narrowing-the-indexable-area">Narrowing the indexable area</h3>
<p>To avoid indexing navbars and widgets, Poindexter provide the following options.</p>
<p><strong>contentSelectors</strong> An array of selectors. Poindexter tries each selector untill a match is found. Only the content of the first match is indexed. If no match is found, the page is skipped.</p>
<p><strong>IgnoreSelectors</strong> An array of selectors. Poindexter removes any elements matching these selectors.</p>
<p>Please refer to the <a href="https://github.com/roxiness/poindexter/blob/master/defaults.js#L19">scrape function</a> for more info. Alternatively you can use your own scrape function.</p>
<h3 id="options">Options</h3>
<p>Please refer to the <a href="https://github.com/roxiness/poindexter/blob/master/defaults.js">defaults</a> for now.</p>
<h3 id="configuration">Configuration</h3>
<p>Thanks to <a href="https://github.com/roxiness/configent">Configent</a> Poindexter can be configured here </p>
<ul>
<li>poindexter.config.js</li>
<li>package.json (create a poindexter field)</li>
<li>environment</li>
<li>.env</li>
<li>command line</li>
<li>API</li>
</ul>
<h3 id="title-description-and-keywords">Title, description and keywords</h3>
<p>Poindexter assumes that title, meta description and meta keywords are available in your HTML. Please refer to <a href="https://github.com/roxiness/poindexter/blob/master/defaults.js#L16">defaults</a> If this is not the case, you can create your own resolvers.</p>
<p>Custom resolvers</p>
<pre><code class="language-javascript">{
  title: $ =&gt; &#39;my website&#39;,
  description: $ =&gt; $(&#39;.description&#39;) || &#39;no description&#39;,
  keywords: $ =&gt; $(&#39;meta[name=keywords]&#39;).attr(&#39;content&#39;).split(&#39;,&#39;)
}
</code></pre>
<h1 id="faq">FAQ</h1>
<h4 id="can-i-use-poindexter-with-a-spa">Can I use Poindexter with a SPA?</h4>
<p>Poindexter requires a static site. If you have a SPA, have a look at <a href="https://github.com/roxiness/spank">Spank</a>.</p>
<h4 id="where-can-i-use-poindexter">Where can I use Poindexter?</h4>
<p>Poindexter can be served from the client, your own backend or a serverless function.</p>
<h4 id="how-big-are-the-index-bundles">How big are the index bundles?</h4>
<p>A site like <a href="https://routify.dev">routify.dev</a> with 65 pages, generates a 65 kb bundle after brotli compression.</p>
<hr>
<h1 id="example">Example</h1>
<p><a href="https://routify-2020-git-searchify.sveltaforce.now.sh/">Routify dev build</a>
<img src="https://github.com/roxiness/poindexter/raw/master/./poindexter.gif"></p>
`;export{e as default};
