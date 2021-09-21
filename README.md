# Dwegstea Blog

A blog for my tea appraisals as I've gotten addicted to tea. Made using Gatsby for the front-end, and Contentful as a headless content management system. Hosted with Netlify.

## Live site 

https://dwegstea.netlify.app/

Site design as of 9 September 2020
![Site design](https://i.imgur.com/VITBZ2k.jpg)
![Lighthouse review](https://i.imgur.com/ihNPvOf.jpg)

## Stack
- React/Gatsby for front-end
- Contentful as CMS

## Rationale behind design choices

When making a blog, the easiest option would be to go with a full-fledged CMS option like Wordpress. It has an admin panel for editing posts, and a myriad of themes to make designing your blog relatively easy. I decided to write my own front-end as I was unhappy with the themes available on the site builders I've tried.   

I rolled with Gatsby, a static site generator as there will be little to no dynamic data that needs to be requested in real time. This allows the site to run much faster as there is no delay between the site loading and the data being available.  

When it came to deciding on a content management system, I briefly entertained the idea of making one myself using node/express/postgreSQL which would also have been good practice. In the end, I opted for a free, widely-used option as I valued the convenience of a larger company. I was worried about having to back up my data on my own, protecting against crashes, building an admin interface that I'd rather use that energy to write more blog posts instead of worrying about the infrastructure.  

Why use a CMS in the first place? I anticipate wanting to redesign the site completely in the future, so although writing my blog posts in JSX is a viable and much easier option, it isn't future proof as it won't be an easy task moving all my JSX blog posts to a new frontend ( which could possibly not even be JSX/React-based! ).

## License
[MIT](https://choosealicense.com/licenses/mit/)

Feel free to take and use any of the code if you like, but the domain name `www.dwegstea.me` and name dwegstea is my property and you are #not# allowed to use or include them.
