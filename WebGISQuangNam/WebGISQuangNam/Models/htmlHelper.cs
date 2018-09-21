using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;

namespace WebGISQuangNam.Models
{
    public static class htmlHelper
    {
        public static void createFolder(string name)
        {
            string path = HostingEnvironment.ApplicationPhysicalPath + @"QuanLyHoSo\" + name;
            if (Directory.Exists(path) == false)
            {
                Directory.CreateDirectory(path);
            }
        }
        public static MvcHtmlString Paging(this HtmlHelper html, PagingInfo pagingInfo, Func<int, string> pageUrl, string tag = "li")
        {

            var pagingBuilder = new PagingHtmlBuilder();
            StringBuilder result = new StringBuilder();

            //previous link       
            string prevLink = (pagingInfo.CurrentPage == 1)
                ? pagingBuilder.buildHtmlItem(pageUrl(pagingInfo.CurrentPage - 1), "<", tag, false, true)
                : pagingBuilder.buildHtmlItem(pageUrl(pagingInfo.CurrentPage - 1), "<", tag);
            result.Append(prevLink);

            // only show up to 5 links to the left of the current page   
            var start = (pagingInfo.CurrentPage <= 6) ? 1 : (pagingInfo.CurrentPage - 5);
            // only show up to 5 links to the right of the current page     
            var end = (pagingInfo.CurrentPage > (pagingInfo.TotalPages - 5)) ? pagingInfo.TotalPages : pagingInfo.CurrentPage + 5;

            if (start > 1)
            {
                string firstLink = (pagingInfo.CurrentPage == 1)
                      ? pagingBuilder.buildHtmlItem(pageUrl(1), "1", tag, false, true)
                      : pagingBuilder.buildHtmlItem(pageUrl(1), "1", tag);
                result.Append(firstLink);

                string sunLink1 = (pagingInfo.CurrentPage == 1)
                   ? pagingBuilder.buildHtmlItem(pageUrl(start - 1), "...", tag, false, true)
                   : pagingBuilder.buildHtmlItem(pageUrl(start - 1), "...", tag);
                result.Append(sunLink1);
            }

            for (int i = start; i <= end; i++)
            {
                string pageHtml = "";
                pageHtml = (i == pagingInfo.CurrentPage)
                    ? pagingBuilder.buildHtmlItem(pageUrl(i), i.ToString(), tag, true, false)
                    : pagingBuilder.buildHtmlItem(pageUrl(i), i.ToString(), tag);

                result.Append(pageHtml);
            }

            if (end < (pagingInfo.TotalPages))
            {

                string subLink2 = (pagingInfo.CurrentPage == pagingInfo.TotalPages)
                    ? pagingBuilder.buildHtmlItem(pageUrl(end + 1), "...", tag, false, true)
                    : pagingBuilder.buildHtmlItem(pageUrl(end + 1), "...", tag);
                result.Append(subLink2);

                string endLink = (pagingInfo.CurrentPage == pagingInfo.TotalPages)
                       ? pagingBuilder.buildHtmlItem(pageUrl(pagingInfo.TotalPages), pagingInfo.TotalPages.ToString(), tag, false, true)
                       : pagingBuilder.buildHtmlItem(pageUrl(pagingInfo.TotalPages), pagingInfo.TotalPages.ToString(), tag);
                result.Append(endLink);
            }


            // next link   
            string nextLink = (pagingInfo.CurrentPage == pagingInfo.TotalPages)
                ? pagingBuilder.buildHtmlItem(pageUrl(pagingInfo.CurrentPage + 1), ">", tag, true, true)
                : pagingBuilder.buildHtmlItem(pageUrl(pagingInfo.CurrentPage + 1), ">", tag);
            result.Append(nextLink);


            return MvcHtmlString.Create(result.ToString());
        }

        ////
        public static MvcHtmlString bootsTrapLinks(this HtmlHelper htm, string altText, string innerText, string innerSpan, Func<int, string> pageUrl)
        {
            //var pagingBuilder = new PagingHtmlBuilder();
            //TagBuilder tag = new TagBuilder("a");
            //tag.MergeAttribute("href", pageUrl(0));
            //tag.MergeAttribute("title", altText);
            //tag.SetInnerText(innerText);

            //tag.InnerHtml = innerSpan;

            string tag = " <a href= '" + pageUrl(0) + "' " + innerText + ">" + altText + " " + innerSpan + " </a>";

            return MvcHtmlString.Create(tag.ToString());
        }

        ////
        public static MvcHtmlString tagLinks(this HtmlHelper html, string childTag, string altText, string Cssclass, Func<int, string> pageUrl)
        {
            var pagingBuilder = new PagingHtmlBuilder();
            TagBuilder tag = new TagBuilder("a");
            tag.MergeAttribute("href", pageUrl(0));
            tag.MergeAttribute("title", altText);
            tag.MergeAttribute("class", Cssclass);

            tag.InnerHtml = childTag;
            return MvcHtmlString.Create(tag.ToString());
        }



        ////
        public static MvcHtmlString ImageLinks(this HtmlHelper html, string imagePath, string altText, string Cssclass, Func<int, string> pageUrl)
        {
            var pagingBuilder = new PagingHtmlBuilder();
            TagBuilder tag = new TagBuilder("a");
            tag.MergeAttribute("href", pageUrl(0));
            tag.MergeAttribute("title", altText);
            tag.MergeAttribute("class", Cssclass);

            tag.InnerHtml = "<image src='" + imagePath + "' alt='" + altText + "' />";
            return MvcHtmlString.Create(tag.ToString());
        }
        ////
        public static MvcHtmlString ImageLinks(this HtmlHelper html, string imagePath, string altText, string Cssclass, Func<int, string> pageUrl, string textCenter = "")
        {
            var pagingBuilder = new PagingHtmlBuilder();
            TagBuilder tag = new TagBuilder("a");
            tag.MergeAttribute("href", pageUrl(0));
            tag.MergeAttribute("title", altText);
            tag.MergeAttribute("class", Cssclass);
            if (textCenter != null && textCenter.Trim().Length > 0)
            {
                tag.InnerHtml = "<image src='" + imagePath + "' alt='" + altText + "' /><span>" + textCenter + "</span>";
            }
            else
            {
                tag.InnerHtml = "<image src='" + imagePath + "' alt='" + altText + "' />";
            }
            return MvcHtmlString.Create(tag.ToString());
        }

        ////
        public static MvcHtmlString ImageLinks(this HtmlHelper html, string imagePath, string altText, string Cssclass, Func<int, string> pageUrl, string textName = "", string textCenter = "")
        {
            var pagingBuilder = new PagingHtmlBuilder();
            TagBuilder tag = new TagBuilder("a");
            tag.MergeAttribute("href", pageUrl(0));
            tag.MergeAttribute("title", altText);
            tag.MergeAttribute("class", Cssclass);
            if (textName != null && textName.Trim().Length > 0)
            {
                tag.InnerHtml = "<image src='" + imagePath + "' alt='" + altText + "' /><span>" + textName + "</span>";
            }
            else
            {
                tag.InnerHtml = "<image src='" + imagePath + "' alt='" + altText + "' />";
            }

            if (textCenter != null && textCenter.Trim().Length > 0)
            {
                tag.InnerHtml = "<br/><span>" + textCenter + "</span>";
            }
            return MvcHtmlString.Create(tag.ToString());
        }

        public static MvcHtmlString ImageLinks(this HtmlHelper html, string imagePath, string altText, string Cssclass, string pageUrl, string textName = "", string textCenter = "")
        {
            var pagingBuilder = new PagingHtmlBuilder();
            TagBuilder tag = new TagBuilder("a");
            tag.MergeAttribute("href", pageUrl);
            tag.MergeAttribute("title", altText);
            tag.MergeAttribute("class", Cssclass);
            if (textName != null && textName.Trim().Length > 0)
            {
                tag.InnerHtml = "<image src='" + imagePath + "' alt='" + altText + "' /><span>" + textName + "</span>";
            }
            else
            {
                tag.InnerHtml = "<image src='" + imagePath + "' alt='" + altText + "' />";
            }

            if (textCenter != null && textCenter.Trim().Length > 0)
            {
                tag.InnerHtml = "<br/><span>" + textCenter + "</span>";
            }

            return MvcHtmlString.Create(tag.ToString());
        }

        //// 

        public static string IsActive(this HtmlHelper htmlHelper, string action, string controller)
        {
            var routeData = htmlHelper.ViewContext.RouteData;

            var routeAction = routeData.Values["action"].ToString();
            var routeController = routeData.Values["controller"].ToString();

            var returnActive = (controller == routeController && action == routeAction);

            return returnActive ? "active" : "";
        }

        ////
    }

    public class PagingHtmlBuilder
    {

        public string buildHtmlItem(string url, string display, string _tag, bool active = false, bool disabled = false)
        {
            // every item wrapped in LI tag 
            TagBuilder liTag = new TagBuilder(_tag);
            if (disabled)
            {
                // add disabled class and use a SPAN tag inside
                liTag.MergeAttribute("class", "disabled");
                var spanTag = new TagBuilder("a");
                spanTag.MergeAttribute("href", "#");
                spanTag.InnerHtml = display;
                liTag.InnerHtml = spanTag.ToString();
            }
            else
            {
                if (active)
                {
                    liTag.MergeAttribute("class", "selected");
                }
                // use inner A tag  
                TagBuilder tag = new TagBuilder("a");
                tag.MergeAttribute("href", url);
                tag.InnerHtml = display;
                liTag.InnerHtml = tag.ToString();
            }

            return liTag.ToString();

        }
    }

    public class PagingInfo
    {
        public int TotalItems { get; set; }
        public int ItemsPerPage { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages
        {
            get { return (int)Math.Ceiling((decimal)TotalItems / ItemsPerPage); }
        }
    }

}