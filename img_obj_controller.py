import img_obj

def generate_io(url, prefix, ext,start, end):
    ioList = []
    for i in range(start,end+1):
        a = img_obj.img_obj()
        a.set_io(url,prefix,ext,i)
        a.get_url()
        ioList.append(a)
    return ioList

def generate_urllist(iolist):
    urllist = []
    for i in iolist:
        urllist.append(i.get_url())
    return urllist