#!/usr/bin/env ruby

ROOT    = File.dirname(__FILE__)
IN_DIR  = File.join(ROOT, 'gallery')
TMP_DIR = File.join(ROOT, 'tmp', 'gallery', 'images')

require 'yaml'
require 'digest'
require 'fileutils'

def convert
  digests_file = File.join(IN_DIR, 'digests.yml')
  digests = YAML.load_file(digests_file) rescue {}

  Dir.glob(File.join(IN_DIR, '**', '*.jpg')) do |file|
    digest = Digest::MD5.hexdigest(File.read(file))
    next if digest == digests[file]
    digests[file] = digest

    filename  = File.basename(file).downcase.gsub(/[\s\-_]+/, '-').sub(/\.[a-z]+\z/, '.jpg')
    outdir    = File.join(TMP_DIR, File.dirname(file).downcase.gsub(/\s+/, '-'))
    outfile   = File.join(outdir, filename)
    thumb     = File.join(outdir, 'thumbs', filename)

    print "Creating file: #{outfile} ..."

    FileUtils.mkdir_p(File.join(outdir, 'thumbs'))
    %x[magick convert '#{file}' -resize 1140x1140 -quality 40 '#{thumb}']
    %x[magick convert '#{file}' -resize 2560x2560 -quality 40 '#{outfile}']

    puts 'Done!'
  end

  File.write(digests_file, digests.to_yaml)
end

convert

if ARGV.include?('--watch')
  require 'listen'

  listener = Listen.to(IN_DIR) do |modified, added, removed|
    # puts "modified absolute path: #{modified}"
    # puts "added absolute path: #{added}"
    # puts "removed absolute path: #{removed}"
    convert
  end
  listener.start # not blocking
  sleep
end
