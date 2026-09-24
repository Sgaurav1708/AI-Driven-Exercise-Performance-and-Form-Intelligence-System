from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
with ZipFile('Netlify-Deploy.zip','w',ZIP_DEFLATED) as z:
 for p in Path('dist').rglob('*'):
  if p.is_file(): z.write(p,p.relative_to('dist'))
with ZipFile('AI-Driven-Exercise-Performance-and-Form-Intelligence-System.zip','w',ZIP_DEFLATED) as z:
 for folder in ['dist','tests','scripts']:
  for p in Path(folder).rglob('*'):
   if p.is_file():z.write(p,p)
 for name in ['README.md','DEMO-GUIDE.md','VERIFICATION.md','THIRD-PARTY-NOTICES.md','server.mjs','package.json','netlify.toml','Start Exercise Intelligence.cmd','.gitignore']:z.write(name)
print('Updated deployment and source archives.')
