# My github page using ```HTMX```

HTMX offers a lot of flexibility on serverless application.

In fact, it alows to fetch and update content easily and that's the reason why I choose to build my personal github page around this.
Since Github pages are simple html files that's great.

However before building anything you have to keep in mind that requests will be made by users themselves (not the server)

Before building anything I made sure I had a design to follow.

I went on Dribbble, Behance and Pinterest to get some inspiration, I also found that github blog was well built and decided to take some inspiration.

I don't want to copy, and I would like to get something quite unique.

My goal is to have LLM post generation, based on my unorganized and chaotic thoughts.

The architecture is the following one :
- Frontend built with htmx elements that auto fetch posts on scroll designed using tailwind css
- Backend hosted on open source platform that uses edge functions to build posts based on thoughts, adding images and so on 
- I should also have a way to interact with the backend in a nice interface that let my words flows (admin dashboard or somewhat)

