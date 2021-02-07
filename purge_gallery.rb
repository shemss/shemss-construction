#!/usr/bin/env ruby

ROOT    = File.dirname(__FILE__)
IN_DIR  = File.join(ROOT, 'gallery')
TMP_DIR = File.join(ROOT, 'tmp', 'gallery', 'images')

require 'yaml'
require 'digest'
require 'fileutils'

def purge
  digests_file = File.join(IN_DIR, 'digests.yml')
  digests = YAML.load_file(digests_file) rescue {}

  digests.each do |file, digest|
    next if File.file?(File.join(ROOT, file))

    filename  = File.basename(file).downcase.gsub(/[\s\-_]+/, '-').sub(/\.[a-z]+\z/, '.jpg')
    outdir    = File.join(TMP_DIR, File.dirname(file).downcase.gsub(/\s+/, '-'))
    outfile   = File.join(outdir, filename)
    thumb     = File.join(outdir, 'thumbs', filename)

    File.delete(outfile) if File.file?(outfile)
    File.delete(thumb) if File.file?(thumb)

    digests.delete(file)
  end

  File.write(digests_file, digests.to_yaml)
end

purge
