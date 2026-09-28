"""Operation correlation shared by request-bound application services."""

from contextvars import ContextVar

_operation_id = ContextVar("operation_id", default=None)


def bind_operation(operation_id):
    return _operation_id.set(str(operation_id))


def clear_operation():
    _operation_id.set(None)


def current_operation_id():
    return _operation_id.get()
