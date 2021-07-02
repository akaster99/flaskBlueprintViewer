class img_obj:
    def __init__(self):
        self.url = ""
        self.prefix = ""
        self. ext = ""
        self. sequence = 0
    
    def set_io(self,url,prefix,ext,sequence):
        self.url = url
        self.prefix = prefix
        self.ext = ext
        self.sequence = sequence


    def get_url(self):
        self.finurl = self.url + self.prefix + str(self.sequence)+ "." + self.ext
        return self.finurl

        