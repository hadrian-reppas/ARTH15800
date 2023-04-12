import subprocess
import json
import sys

pieces = json.load(open('src/art.json'))


def download():
    for i, piece in enumerate(pieces):
        link, index = piece['link'], piece['index']
        subprocess.run(f'curl -o src/img/raw/{index}.idk {link}', shell=True)
        print(f'{i + 1}/{len(pieces)}')


def resize(new_height):
    images = 'const images = [\n'
    for i, piece in enumerate(pieces):
        index = piece['index']
        info = subprocess.check_output(
            ['magick', 'identify', f'src/img/raw/{index}.idk'])
        _, _, size, *_ = info.decode('utf-8').split()
        width, height = map(int, size.split('x'))
        ratio = width / height
        new_width = round(ratio * new_height)
        subprocess.run(
            f'convert src/img/raw/{index}.idk -resize {new_width}x{new_height} src/img/{index}.png', shell=True)
        images += f"  require('./{index}.png'),\n"
        print(f'{i + 1}/{len(pieces)}')
    with open('src/img/images.js', 'w') as out:
        out.write(images[:-2] + '\n];\nexport default images;')


def clean():
    subprocess.run('rm src/img/*.png', shell=True)
    subprocess.run('rm src/img/raw/*', shell=True)


if __name__ == '__main__':
    args = sys.argv
    if args[1] == 'download' or args[1] == 'd':
        download()
    elif args[1] == 'resize' or args[1] == 'r':
        resize(int(args[2]))
    elif args[1] == 'clean' or args[1] == 'c':
        clean()
    else:
        assert False
