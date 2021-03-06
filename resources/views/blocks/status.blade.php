@if(session('status'))
  <div class="container my-4">
    <div class="alert alert-info alert-dismissible fade show main-alert">
      {!! session('status') !!}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
@endif
@if(session('error'))
  <div class="container my-4">
    <div class="alert alert-danger alert-dismissible fade show">
      {!! session('error') !!}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
@endif