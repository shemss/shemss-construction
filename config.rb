# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

activate :directory_indexes

activate :blog do |blog|
  blog.name = "our-homes"
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "our-homes"

  blog.permalink = "{slug}.html"
  # Matcher for blog source files
  blog.sources = "{slug}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "homes"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  # blog.tag_template = "tag.html"
  # blog.calendar_template = "calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"end
end

activate :external_pipeline,
  name: :parcel,
  command: build? ? 'NODE_ENV=production yarn build-js' : 'yarn dev',
  source: 'tmp/assets',
  latency: 1

activate :external_pipeline,
  name: :image,
  command: "ruby gallery.rb #{'--watch' unless build?}",
  source: 'tmp/gallery',
  latency: 1

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify HTML on build
  activate :minify_html do |html|
    html.remove_input_attributes  = false
    html.preserve_line_breaks     = true
  end

  # Gzip everything
  activate :gzip

  # Fingerprints on assets
  activate :asset_hash, ignore: %w(stylesheets/default-skin.*),
    exts: (app.config[:asset_extensions] - %w(.ico .map) + %w(.mp4))
end

activate :s3_sync
