"""Shared helpers for building the camelCase JSON the React frontend expects."""
from __future__ import annotations

from datetime import date, datetime, timedelta
from typing import Iterable, Optional


def fmt_date(value) -> str:
    """datetime/date -> '3 Sep 2025' style string used across dashboards."""
    if value is None:
        return ""
    if isinstance(value, datetime):
        return f"{value.day} {value.strftime('%b')}, {value.year}"
    return f"{value.day} {value.strftime('%b')}, {value.year}"


def fmt_month_year(value) -> str:
    if value is None:
        return ""
    return f"{value.strftime('%b')} {value.year}"


def initials_for(name: str) -> str:
    parts = [p for p in name.replace(".", " ").split() if p]
    if not parts:
        return "?"
    if len(parts) >= 2:
        return (parts[0][0] + parts[1][0]).upper()
    return parts[0][:2].upper()


def month_shift(base: date, months: int) -> date:
    """Add/subtract whole months to a date (no dateutil dependency)."""
    total = base.year * 12 + (base.month - 1) + months
    year, zero_indexed = divmod(total, 12)
    day = min(base.day, 28)
    return date(year, zero_indexed + 1, day)


def month_key(d: date) -> str:
    return d.strftime("%Y-%m")


def month_label(d: date) -> str:
    return d.strftime("%b")


def last_months(n: int):
    """List of {key, label} for the last n calendar months ending with now."""
    today = date.today()
    out = []
    for i in range(n - 1, -1, -1):
        d = month_shift(today, -i)
        out.append({"key": month_key(d), "label": month_label(d)})
    return out


def date_from_key(key: str) -> date:
    return datetime.strptime(key, "%Y-%m").date()


def rounded(value: Optional[float], ndigits: int = 0):
    if value is None:
        return 0
    if ndigits == 0:
        return int(round(value))
    return round(value, ndigits)


def safe_div(num, den, default: float = 0.0) -> float:
    return round((num / den) * 100, 1) if den else default


def stage_label(stage: str) -> str:
    return {
        "applied": "Applied",
        "shortlisted": "Shortlisted",
        "interviewed": "Interviewed",
        "offered": "Offered",
        "joined": "Joined",
        "rejected": "Rejected",
    }.get(stage, stage.replace("-", " ").title())


def days_ago_label(dt, now=None) -> str:
    now = now or datetime.now()
    delta = (now - dt).days if dt else 0
    if delta <= 0:
        return "Submitted today"
    return f"Submitted {delta} day{'s' if delta != 1 else ''} ago"
