const sidebar = `<div class="sidebar">
<div class="logo-content">
    <div class="logo">
        <i class="bx bxs-castle"></i>
        <div class="logo-name">搶救學分大作戰</div>
    </div>
    <i class="bx bx-menu" id="sidebar-btn"></i>
    <ul class="sidebar-list">
        <li>
        <a href="regulation.html">
            <i class="bx bxs-grid"></i>
            <span class="links-name">規則</span>
        </a>
            <span class="tooltip">規則</span>
        </li>
         <li>
            <a href="index.html">
                <i class="bx bx-grid"></i>
                <span class="links-name">計分主頁</span>
            </a>
            <span class="tooltip">計分主頁</span>
        </li>
        <li>
            <a href="signin.html">
                <i class="bx bx-grid"></i>
                <span class="links-name">登入</span>
            </a>
            <span class="tooltip">登入</span>
        </li>
        <li>
            <a href="administratersignin.html">
                <i class="bx bx-grid"></i>
                <span class="links-name">系統管理員登入</span>
            </a>
            <span class="tooltip">系統管理員登入</span>
        </li>
        
    </ul>
</div>
</div>`;
const header = `<div class="header">
<nav>
    <a href="res/img/EoSD Cover.jpg">
        <img width=80 src="res/img/${parseInt(
            document.querySelector("div.content").id
        )}/280px-Th${
    document.querySelector("div.content").id
}cover.webp" alt=""></img>
    </a>
    <ul id="nav-items"></ul>
 </nav>
</div>`;

const loadContent = async () => {
    let _content = document.querySelector("div.content");
    let seriesNumber = parseInt(_content.id);
    const response = await fetch(`./res/content/${seriesNumber}.json`);
    const content = await response.json();

    // Cover
    let _cover = document.createElement("img");
    _cover.src = content["Cover"];
    _content.appendChild(_cover);

    // Title
    let _title = document.createElement("h1");
    _title.id = "title";
    _content.appendChild(_title);
    document.querySelector("#title").innerHTML = content["Title"];
    document.querySelector("title").innerHTML = content["Title"];

    const sections = [
        "Introduction",
        "Information",
        "Basic Settings",
        "Story",
        "System",
    ];
    sections.forEach((sectionElement) => {
        try {
            let sectionTitle = content[sectionElement]["Title"];
            let _sectionNode = document.createElement("div");
            _sectionNode.className = "sections";
            _sectionNode.id = sectionTitle;
            document.querySelector("div.content").appendChild(_sectionNode);

            // Title
            let titleNode = document.createElement("h1");
            titleNode.appendChild(document.createTextNode(sectionTitle));
            let sectionNode = document.querySelector(`div#${sectionTitle}`);
            sectionNode.appendChild(titleNode);

            // Content
            Array.from(content[sectionElement]["content"]).forEach(
                (element) => {
                    let contentNode;
                    if (element.startsWith("p")) {
                        // p
                        element = element.replace("p", "");
                        contentNode = document.createElement("p");
                        if (element.startsWith(".tct///")) {
                            // tct
                            contentNode.className = "tct";
                            element
                                .slice(7)
                                .split("<br>")
                                .forEach((text) => {
                                    contentNode.appendChild(
                                        document.createTextNode(text)
                                    );
                                    contentNode.appendChild(
                                        document.createElement("br")
                                    );
                                });
                            contentNode.innerHTML =
                                "&nbsp;&nbsp;&nbsp;&nbsp; " +
                                contentNode.innerHTML;
                        } else if (element.startsWith(".hb///")) {
                            // hb
                            contentNode.className = "hb";
                            element
                                .slice(6)
                                .split("<br>")
                                .forEach((text) => {
                                    contentNode.appendChild(
                                        document.createTextNode(text)
                                    );
                                    contentNode.appendChild(
                                        document.createElement("br")
                                    );
                                });
                        } else {
                            // default
                            element
                                .slice(3)
                                .split("<br>")
                                .forEach((text) => {
                                    contentNode.appendChild(
                                        document.createTextNode(text)
                                    );
                                    contentNode.appendChild(
                                        document.createElement("br")
                                    );
                                });
                        }
                    } else if (element.startsWith("h2")) {
                        //h2
                        element = element.replace("h2", "");
                        contentNode = document.createElement("h2");
                        contentNode.appendChild(
                            document.createTextNode(element.slice(3))
                        );
                    } else if (element.startsWith("img")) {
                        // img
                        contentNode = document.createElement("img");
                        contentNode.src = element.slice(6);
                    }
                    try {
                        sectionNode.appendChild(contentNode);
                    } catch (e) {}
                }
            );
        } catch (e) {}
    });
};

const navItemsAdd = () => {
    const nav = document.querySelector("ul#nav-items");
    console.log(document.getElementsByClassName("sections"));
    Array.from(document.getElementsByClassName("sections")).forEach(
        (element) => {
            console.log(element);
            let item = document.createElement("li");
            item.appendChild(document.createTextNode(element.id));
            let a = document.createElement("a");
            a.href = `#${element.id}`;
            a.appendChild(item);
            nav.appendChild(a);
        }
    );
};

const sidebarHeader = () => {
    document.querySelector("#sidebar-block").innerHTML = sidebar;
    document.querySelector("#header-block").innerHTML = header;
    toggleBtn = document.querySelector("#sidebar-btn").onclick = () => {
        document.querySelector(".sidebar").classList.toggle("active");
    };
    loadContent();
    navItemsAdd();
};

sidebarHeader();