/** @module */
import lunr from "lunr";
import * as file from "./file.js";
import * as sparql from "./sparql.js";
import timer from "./timer.js";

let idx = null;

export function create()
{
  const sparqlTimer = timer("sparql");
  const query = `select ?c
  str(group_concat(?l," ")) as ?l
  str(group_concat(?al," ")) as ?al
  str(group_concat(?def," ")) as ?def
  from <http://www.snik.eu/ontology>
  {
    ?c a owl:Class.
    #{?c ?p ?o.} UNION {?o ?p ?c}.#too slow, remove isolated nodes in post processing
    OPTIONAL {?c rdfs:label ?l.}
    OPTIONAL {?c skos:prefLabel ?al.}
    OPTIONAL {?c skos:definition ?def.}
  }`;

  sparql.sparql(query)
    .then(bindings=>
    {
      sparqlTimer.stop();
      if(bindings.length===0) {throw "No results for SPARQL Query";}
      console.log("Processing "+bindings.length+" bindings.");
      const documents = [];
      for(const b of bindings)
      {
        const doc = {"uri": b.c.value};
        if(b.l.value) {doc.label=b.l.value;}
        if(b.al.value) {doc.altLabel=b.l.value;}
        if(b.def.value) {doc.definition=b.l.value;}
        documents.push(doc);
      }
      const idx = lunr(function ()
      {
        this.ref('uri');
        this.field('label');
        this.field('label');
        documents.forEach(function (d)
        {
          this.add(d);
        }, this);
      });
      return idx;
    });
}

export function index()
{
  if(idx===null)
  {
    file.readTextFile("lunr.json")
      .then(text=>
      {
        idx = lunr.Index.load(JSON.parse(text));
      }).catch(e=>
      {
        idx = create();
        // TODO: save with web storage
      }).then(()=>idx);
  }
}
