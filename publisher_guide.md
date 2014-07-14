# Open GeoSocial API Publisher Guide

## Pre-Requisites

### Facebook Application Registration

  To push products through social networks such as Facebook, you are required to have a Facebook AppId and secret.  Please Sign up for a Facebook developer account and create a new Facebook Application [Here](https://developers.facebook.com/docs/web/tutorials/scrumptious/register-facebook-application/)
  
  Please see the Consumer Guide for further information
  
#### Facebook OpenGraph

  To publish a product page, you need to be familiar with [Facebook Opengraph](https://developers.facebook.com/docs/opengraph) and meta-tags required to appear in the header of the product page.
  
### Twitter Application Registration

  To allow users to tweet about your product (and see an associated Twitter Card), we need to register your App on Twitter.  Please Sign in with your Twitter Account (or create one) and create your app [Here](https://apps.twitter.com)
  
#### Twitter Cards

  To allow users to tweet your product and visualize information regarding your prodcut, you may want to read about [Twitter Cards](https://dev.twitter.com/cards).

## Operations

### Bewit Usage

Product publishers may want to protect access to resources to capture user consumption of such resources for audit/metrics purpose.  When responding to an OpenSearch query, the publisher may want to add an additional parameter (bewit) to any provided url links.  This parameter contains the necessary credentials to authenticate the request if the consumer were to decide to follow the provided link (see).

### Open Search Syntax

OpenSearch URL template syntax 
Example: http://example.com/search?q={ProductSearchTerm}

Search parameter: <br/>
&nbsp;&nbsp;q<br/>

Available Products:  <br/>
&nbsp;&nbsp;surface_water, <br/>
&nbsp;&nbsp;daily_precipitation,<br/> 
&nbsp;&nbsp;daily_precipitation_24hr_forecast,<br/>
&nbsp;&nbsp;flood_forecast,<br/>
&nbsp;&nbsp;landslide_forecast<br/>

Optional parameters:<br/>
&nbsp;&nbsp; 	startIndex<br/>
&nbsp;&nbsp; 	itemsPerPage<br/>
&nbsp;&nbsp; 	language<br/>
&nbsp;&nbsp; 	latitude, longitude or bbox<br/>
&nbsp;&nbsp; 	startTime<br/>
&nbsp;&nbsp; 	endTime<br/>
&nbsp;&nbsp; limit<br/>

Output Encoding<br/>
&nbsp;&nbsp;Publisher shall respond in JSON format

Output Format:<br/>
&nbsp;&nbsp;JSON Activity stream/action<br/>
&nbsp;&nbsp;http://tools.ietf.org/html/draft-snell-activitystreams-09 <br/>
&nbsp;&nbsp;http://tools.ietf.org/html/draft-snell-activitystreams-actions-06<br/>

### Publishing a Product

Assuming a root path of /, products could be served from /products/:type/:id as an example.
Clients need to have access to a product page for each available product.
That page could be rendered in html or JSON format based on headers in the request or url extension

Example:<br/>
&nbsp;&nbsp;	http://www.example.com/products/surface_water/193<br/>
&nbsp;&nbsp;	http://www.example.com/products/surface_water/193.html<br/>
&nbsp;&nbsp;	http://www.example.com/products/surface_water/193.json<br/>

The language will be detected in the headers (from browser preferences or set by consumer HTTP Accept-Language header)

### Meta-tags

The publisher will add metatags to allow the publishing of the product as Twitter Card and Facebook OpenGraph<br/>
&nbsp;&nbsp; https://dev.twitter.com/cards<br/>
&nbsp;&nbsp; https://developers.facebook.com/docs/opengraph<br/>
&nbsp;&nbsp; http://davidwalsh.name/facebook-meta-tags <br/>

