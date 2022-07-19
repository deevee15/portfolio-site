document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('.logo_projects').style.display = 'none';document.querySelector('.logo_skills').style.display = 'none';document.querySelector('#all_p').style.display = 'none';document.querySelector('#banner').style.display = 'none';
    document.querySelector('#logo').addEventListener('click', () =>{window.scrollTo({top: 0, behavior: 'smooth'});});
    document.querySelector('.main_skillsb_button').addEventListener('click', () =>{window.scrollTo({top: document.querySelector('#skills').offsetTop - 50, behavior: 'smooth'});});
    document.querySelector('#buttons ul li:first-child').addEventListener('click', () =>{window.scrollTo({top: document.querySelector('#projects').offsetTop - 50, behavior: 'smooth'});});
    const skillsPos = document.querySelector('#skills').getBoundingClientRect().top + document.body.scrollTop;
    const projectsPos = document.querySelector('#projects').getBoundingClientRect().top + document.body.scrollTop;
    const projectsMobPos = document.querySelector('#projects_mobile').getBoundingClientRect().top + document.body.scrollTop;
    window.addEventListener('scroll', () =>{
        document.querySelector('#logo').classList.add('scrolled');
        if(window.scrollY>20 && window.scrollY<skillsPos - 150){
            document.querySelector('#buttons').classList.remove('projects');
            document.querySelector('#buttons ul li:first-child').classList.remove('clicked');
        }
        else if(window.scrollY >= skillsPos - 150 && window.scrollY < projectsPos - 150){
            document.querySelector('.logo_projects').style.display = 'none';
            document.querySelector('.logo_skills').style.display = '';
            document.querySelector('#buttons ul li:first-child').classList.remove('clicked');
        }
        else if((window.scrollY >= projectsPos - 150) || (window.scrollY>=projectsMobPos - 250)){
            document.querySelector('.logo_projects').style.display = '';
            document.querySelector('.logo_skills').style.display = 'none';
            document.querySelector('#buttons').classList.add('projects');
            document.querySelector('#buttons ul li:first-child').classList.add('clicked');
        }
        else{
            document.querySelector('#buttons ul li:first-child').classList.remove('clicked');
            document.querySelector('.logo_projects').style.display = 'none';
            document.querySelector('.logo_skills').style.display = 'none';
        }
    });
    let hidden=true;
    document.querySelector('#buttons ul li:nth-child(2)').addEventListener('click', () =>{
        document.querySelector('#footer').classList.toggle('show');
        document.querySelector('#buttons ul li:nth-child(2)').classList.toggle('clicked');
        if(hidden){hidden=false;}
        else{hidden=false;}
    });
    //project select functions
    function selectProject(prjId){
        let req = new XMLHttpRequest();
        let params="prj="+prjId;
        req.open("POST", "select_project.php", true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(params);
        req.onreadystatechange = function() { 
            if (req.readyState == 4) { 
                if(req.status == 200) {
                    if(req.response=='404'){console.log('Error#404. There is no projects found.');}
                    else{ 
                        let resp = req.response;
                        let data=JSON.parse(resp);
                        document.querySelector('.projects_prj_leftpanel_numbering').innerHTML = `work #${data.id}`;
                        document.querySelector('.projects_prj_leftpanel_name').innerHTML = data.title_1;
                        document.querySelector('.projects_prj_leftpanel_title').innerHTML = data.title_2;
                        document.querySelector('.projects_prj_leftpanel_desc').innerHTML = data.description;
                        if(data.id==1) document.querySelector('.projects_prj_leftpanel_button ul a:first-child').href = 'javascript: void(0)';
                        else document.querySelector('.projects_prj_leftpanel_button ul a:first-child').href = data.link;
                        if(data.git=='none') document.querySelector('.projects_prj_leftpanel_button ul a:nth-child(2)').href = 'javascript: void(0);';
                        else document.querySelector('.projects_prj_leftpanel_button ul a:nth-child(2)').href = data.git;
                        document.querySelector('.projects_prj_leftpanel_button ul a:nth-child(2)').href = data.imgur;
                        document.querySelector('.projects_prj_leftpanel_links_next').setAttribute('current_pid', data.id);
                        document.querySelector('.projects_prj_rightpanel_pic img').setAttribute('src', data.image);
                    }
                }
            }
        }; 
    }
    const projects_prj_others_img = document.querySelectorAll('.projects_prj_others_img');
    for(const prImgCount of projects_prj_others_img){
        prImgCount.addEventListener('click', () =>{
            window.scrollTo({top:projectsPos-50,behavior: "smooth"});
            let getId=prImgCount.getAttribute('prj_id');
            selectProject(getId);
        });
    }
    let nextButton = document.querySelector('.projects_prj_leftpanel_links_next');
    nextButton.addEventListener('click', ()=>{
        let getcurrentid=nextButton.getAttribute('current_pid');
        window.scrollTo({top:projectsPos-50,behavior: "smooth"});
        ++getcurrentid;
        selectProject(getcurrentid);
    });
    const cards = document.querySelectorAll('.all_p_cards_card');
    for(const cardsCount of cards){
        cardsCount.addEventListener('click', ()=>{
            window.scrollTo({top:projectsPos-50,behavior: "smooth"});
            let getId=cardsCount.getAttribute('p_id');
            selectProject(getId);
          });
        }
    //
    document.querySelector('.projects_prj_leftpanel_links_list').addEventListener('click', () =>{
        const allp = document.querySelector('#all_p');
        allp.style.display = '';
        const allpPos = allp.offsetTop;
        window.scrollTo({top: allpPos-50, behavior: 'smooth'});
    });
    const demoButton = document.querySelector('.all_p_cards_other_buttons_demo');
    const leftpaneldemoButton = document.querySelector('.projects_prj_leftpanel_button_demo');
    function demoClick(obj){
        obj.addEventListener('click', () =>{
            if(demoButton.getAttribute('p_id')==1 || leftpaneldemoButton.getAttribute('p_id')==1){
                document.querySelector('#banner').style.display = '';
                document.querySelector('#banner p').innerHTML = 'Sorry, but demonstration is not available because of site’s difficulty. You can check example of its working in <a href="https://youtu.be/VHPUkvyUSVs">YouTube</a>.';
            }
        });
    }
    document.querySelector('.banner_button').addEventListener('click', () =>{
        document.querySelector('#banner').style.display = 'none';
        document.querySelector('#banner p').innerHTML = '';
    });
    demoClick(demoButton); demoClick(leftpaneldemoButton);
    //for mobile devices
    document.querySelector('.footer_backdrop-mob').style.display = 'none';
    let burger = document.querySelector('#burger');
    let burgerLine = document.querySelector('.burger_line');
    let burgerClose = document.querySelector('.burger_close');
    let menu = document.querySelector('#menu');
    let footer = document.querySelector('#footer');
    function closeBurger(){
        burgerLine.style.display = 'block';
        burgerClose.style.display = 'none';
        burger.style.background = '#000';
        menu.style.display = 'none';
    } 
    function footerHide(){
        document.querySelector('.footer_backdrop-mob').style.display = 'none';
        footer.classList.remove('show');
    }
    burger.addEventListener('click', () =>{
        if(burgerLine.style.display == 'none'){closeBurger();}
        else{
            burgerLine.style.display = 'none';
            burgerClose.style.display = 'block';
            burger.style.background = '#38AE90';
            menu.style.display = 'block';
            footerHide();
        }
    });
    document.querySelector('.menu_list ul li:last-child').addEventListener('click', ()=>{
        closeBurger();
        footer.classList.add('show');
        document.querySelector('.footer_backdrop-mob').style.display = 'block';
        document.querySelector('.footer_contacts p').textContent = 'my e-mail: vikulovd15@gmail.com';
        document.querySelector('.footer_copyright').innerHTML = '© DeeVee,<br> designed and created by <a>Danil Vikulov</a>, 2021';
    });
    document.querySelector('.footer_stripe-mob').addEventListener('click', ()=>{footerHide();});
    document.querySelector('.footer_backdrop-mob').addEventListener('click', ()=>{footerHide();});
    document.querySelector('.menu_list ul li:first-child').addEventListener('click', ()=>{
        closeBurger();
        window.scrollTo({top: projectsMobPos - 125, behavior: "smooth"});
    });
    let allprojectsMob = document.querySelector('#showp_mobile');
    allprojectsMob.style.display = 'none';
    let pmc = document.querySelectorAll('.projects_mobile_card');
    for(const cardsMobCount of pmc){
        cardsMobCount.addEventListener('click', ()=>{
            let projectId=cardsMobCount.getAttribute('cardid');
            let req = new XMLHttpRequest();
            req.open('POST', 'select_project.php', true);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send('prj='+projectId);
            req.onreadystatechange = function(){
                if(req.readyState==4){
                    if(req.status == 200){
                        let resp = req.response;
                        let data=JSON.parse(resp);
                        document.querySelector('.showp_mobile_numbering').innerHTML = `work #${data.id}`;
                        document.querySelector('.showp_mobile_name').innerHTML = data.title_1;
                        document.querySelector('.showp_mobile_title').innerHTML = data.title_2;
                        document.querySelector('.showp_mobile_card_desc').innerHTML = `<span>${data.description}</span>`;
                        if(data.id==1) document.querySelector('.showp_mobile_card_buttons ul a:first-child').href = 'javascript: void(0)';
                        else document.querySelector('.showp_mobile_card_buttons ul a:first-child').href = data.link;
                        if(data.git=='none') document.querySelector('.showp_mobile_card_buttons ul a:nth-child(2)').href = 'javascript: void(0);';
                        else document.querySelector('.showp_mobile_card_buttons ul a:nth-child(2)').href = data.git;
                        document.querySelector('.showp_mobile_card_buttons ul a:nth-child(2)').href = data.imgur;
                        document.querySelector('.showp_mobile_card_background img').setAttribute('src', data.image);
                        allprojectsMob.style.display = 'block';
                        const getshowpPos = allprojectsMob.getBoundingClientRect().top + document.body.scrollTop;
                        window.scrollTo({top: getshowpPos, behavior: "smooth"});
                    }
                }
            }
        });
    }
    let mobileSearchInput = document.querySelector('.projects_mobile_search input');
    mobileSearchInput.addEventListener('keyup', ()=>{
        for(const cardsMobCount of document.querySelectorAll('.projects_mobile_card_title')){
            let getValue=mobileSearchInput.value;
            if(cardsMobCount.includes(getValue.toString()==false)){cardsMobCount.style.display = 'none';}
            else{cardsMobCount.style.display = 'block';}
        }
    });
    document.querySelector('.showp_mobile_backb').addEventListener('click', ()=>{
        allprojectsMob.style.display = 'none';
        window.scrollTo({top: projectsMobPos-125, behavior: "smooth"});
    });
    //
});